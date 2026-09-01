import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const API_URL = "http://localhost:5002/api/books"

function BookDetails() {
  const { id } = useParams()

  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true)
        setError("")

        const response = await fetch(`${API_URL}/${id}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Book not found")
          }

          throw new Error("Failed to fetch book details")
        }

        const data = await response.json()

        setBook({
          ...data,
          id: data._id,
        })
      } catch (err) {
        setError(err.message || "Unable to load book details")
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  if (loading) {
    return (
      <div className="book-details">
        <h2>📚 Loading book details...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div className="book-details">
        <Link to="/">← Back to Catalog</Link>

        <h2>{error}</h2>
      </div>
    )
  }

  return (
    <div className="book-details">
      <Link to="/">← Back to Catalog</Link>

      <h1>{book.title}</h1>

      {book.coverImage && (
        <img
          src={book.coverImage}
          alt={book.title}
          className="book-detail-image"
        />
      )}

      <p>
        <strong>Author:</strong> {book.author}
      </p>

      <p>
        <strong>Genre:</strong> {book.genre}
      </p>

      <p>
        <strong>Price:</strong> ₹{book.price}
      </p>

      <p>
        <strong>Available Stock:</strong> {book.stockQuantity}
      </p>

      <p>
        Discover "{book.title}" by {book.author}, available from
        PageTurner Books.
      </p>
    </div>
  )
}

export default BookDetails