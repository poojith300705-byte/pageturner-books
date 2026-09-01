import { useEffect, useState } from "react"

import BookCard from "./BookCard"
import GenreFilter from "./GenreFilter"

const API_URL = "http://localhost:5002/api/books"

function BookList({ addToWishlist, wishlist }) {
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [bookData, setBookData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true)
        setError("")

        const url =
          selectedGenre === "All"
            ? API_URL
            : `${API_URL}?genre=${encodeURIComponent(selectedGenre)}`

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error("Failed to fetch books")
        }

        const data = await response.json()

        const normalizedBooks = data.books.map((book) => ({
          ...book,
          id: book._id,
        }))

        setBookData(normalizedBooks)
      } catch (err) {
        setError(
          err.message || "Unable to load books"
        )
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [selectedGenre])

  if (loading) {
    return (
      <div className="book-list-status">
        <h2>📚 Loading books...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div className="book-list-status">
        <h2>Unable to load books</h2>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Book Catalog</h2>

      <GenreFilter
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />

      {bookData.length === 0 ? (
        <div className="book-list-status">
          <p>No books available for this genre.</p>
        </div>
      ) : (
        <div className="book-list">
          {bookData.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              addToWishlist={addToWishlist}
              wishlist={wishlist}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default BookList