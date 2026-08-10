import { useEffect, useState } from "react"
import books from "../data/books"
import BookCard from "./BookCard"
import GenreFilter from "./GenreFilter"

function BookList({ addToWishlist, wishlist }) {
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [bookData, setBookData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setBookData(books)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const filteredBooks =
    selectedGenre === "All"
      ? bookData
      : bookData.filter((book) => book.genre === selectedGenre)

  if (loading) {
    return <h2>📚 Loading books...</h2>
  }

  return (
    <div>
      <h2>Book Catalog</h2>

      <GenreFilter
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />

      <div className="book-list">
        {filteredBooks.map((book) => (
          <BookCard
           key={book.id}
           book={book}
           addToWishlist={addToWishlist}
           wishlist={wishlist}
          />
        ))}
      </div>
    </div>
  )
}

export default BookList