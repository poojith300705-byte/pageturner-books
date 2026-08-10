import { Link, useParams } from "react-router-dom"
import books from "../data/books"

function BookDetails() {
  const { id } = useParams()

  const book = books.find((book) => book.id === Number(id))

  if (!book) {
    return (
      <div>
        <h2>Book not found</h2>
        <Link to="/">← Back to Catalog</Link>
      </div>
    )
  }

  return (
    <div className="book-details">
      <Link to="/">← Back to Catalog</Link>

      <h1>{book.title}</h1>

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
        <strong>Rating:</strong> ⭐ {book.rating}
      </p>

      <p>
        Discover "{book.title}" by {book.author}, available from
        PageTurner Books.
      </p>
    </div>
  )
}

export default BookDetails