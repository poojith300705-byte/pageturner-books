import { Link } from "react-router-dom"

function BookCard({ book, addToWishlist, wishlist }) {
  const isWishlisted = wishlist.some(
    (item) => (item.id || item._id) === book.id
  )

  return (
    <div className="book-card">
      {book.coverImage && (
        <img
          src={book.coverImage}
          alt={book.title}
          className="book-cover"
        />
      )}

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
        <strong>Rating:</strong> ⭐ {book.rating || "N/A"}
      </p>

      <p>
        <strong>Stock:</strong> {book.stockQuantity}
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