import { Link } from "react-router-dom"

function BookCard({ book, addToWishlist, wishlist }) {
  const isWishlisted = wishlist.some((item) => item.id === book.id)

  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`}>
        <h2>{book.title}</h2>
      </Link>

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

      <button
        onClick={() => addToWishlist(book)}
        disabled={isWishlisted}
      >
        {isWishlisted
          ? "✓ Added to Wishlist"
          : "Add to Wishlist ❤️"}
      </button>
    </div>
  )
}

export default BookCard