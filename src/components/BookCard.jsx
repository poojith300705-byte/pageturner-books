import { Link } from "react-router-dom"

function BookCard({
    book,
    addToWishlist,
    wishlist
  }) {
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
    disabled={wishlist.includes(book.id)}
      >
    {wishlist.includes(book.id)
        ? "✓ Added to Wishlist"
        : "Add to Wishlist ❤️"}
      </button>

    </div>
  )
}

export default BookCard