import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"

const API_URL = "http://localhost:5002"

function AdminDashboard() {
  const navigate = useNavigate()
  const { token, isAuthenticated } = useAuth()

  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editingBook, setEditingBook] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin")
      return
    }

    fetchBooks()
  }, [isAuthenticated, navigate])

  async function fetchBooks() {
    try {
      setLoading(true)
      setError("")

      const response = await fetch(`${API_URL}/api/books`)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to fetch books"
        )
      }

      setBooks(data.books || [])
    } catch (err) {
      setError(
        err.message || "Unable to fetch books"
      )
    } finally {
      setLoading(false)
    }
  }

  function startEditing(book) {
    setMessage("")
    setError("")

    setEditingBook({
      _id: book._id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      price: book.price,
      coverImage: book.coverImage || "",
      stockQuantity: book.stockQuantity,
    })
  }

  function cancelEditing() {
    setEditingBook(null)
  }

  function handleEditChange(event) {
    const { name, value } = event.target

    setEditingBook((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function updateBook(event) {
    event.preventDefault()

    try {
      setMessage("")
      setError("")

      const response = await fetch(
        `${API_URL}/api/books/${editingBook._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editingBook.title,
            author: editingBook.author,
            genre: editingBook.genre,
            price: Number(editingBook.price),
            coverImage: editingBook.coverImage,
            stockQuantity: Number(
              editingBook.stockQuantity
            ),
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to update book"
        )
      }

      setMessage("Book updated successfully!")
      setEditingBook(null)

      await fetchBooks()
    } catch (err) {
      setError(
        err.message || "Unable to update book"
      )
    }
  }

  async function deleteBook(bookId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    )

    if (!confirmed) {
      return
    }

    try {
      setMessage("")
      setError("")

      const response = await fetch(
        `${API_URL}/api/books/${bookId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to delete book"
        )
      }

      setMessage("Book deleted successfully!")

      setBooks((currentBooks) =>
        currentBooks.filter(
          (book) => book._id !== bookId
        )
      )
    } catch (err) {
      setError(
        err.message || "Unable to delete book"
      )
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage your PageTurner book catalog.</p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/add-book")}
        >
          Add New Book
        </button>
      </div>

      {message && (
        <p className="form-success">
          {message}
        </p>
      )}

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}

      {loading ? (
        <div className="dashboard-status">
          <h2>Loading books...</h2>
        </div>
      ) : books.length === 0 ? (
        <div className="dashboard-status">
          <h2>No books found</h2>
          <p>Add your first book to the catalog.</p>
        </div>
      ) : (
        <div className="admin-book-list">
          {books.map((book) => (
            <div
              className="admin-book-card"
              key={book._id}
            >
              {editingBook?._id === book._id ? (
                <form
                  className="edit-book-form"
                  onSubmit={updateBook}
                >
                  <h2>Edit Book</h2>

                  <div className="form-group">
                    <label htmlFor="edit-title">
                      Title
                    </label>

                    <input
                      id="edit-title"
                      name="title"
                      type="text"
                      value={editingBook.title}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="edit-author">
                      Author
                    </label>

                    <input
                      id="edit-author"
                      name="author"
                      type="text"
                      value={editingBook.author}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="edit-genre">
                      Genre
                    </label>

                    <input
                      id="edit-genre"
                      name="genre"
                      type="text"
                      value={editingBook.genre}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="edit-price">
                      Price
                    </label>

                    <input
                      id="edit-price"
                      name="price"
                      type="number"
                      min="0"
                      value={editingBook.price}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="edit-coverImage">
                      Cover Image URL
                    </label>

                    <input
                      id="edit-coverImage"
                      name="coverImage"
                      type="url"
                      value={editingBook.coverImage}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="edit-stock">
                      Stock Quantity
                    </label>

                    <input
                      id="edit-stock"
                      name="stockQuantity"
                      type="number"
                      min="0"
                      value={editingBook.stockQuantity}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <div className="edit-actions">
                    <button type="submit">
                      Save Changes
                    </button>

                    <button
                      type="button"
                      className="secondary-button"
                      onClick={cancelEditing}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div>
                    <h2>{book.title}</h2>

                    <p>
                      <strong>Author:</strong>{" "}
                      {book.author}
                    </p>

                    <p>
                      <strong>Genre:</strong>{" "}
                      {book.genre}
                    </p>

                    <p>
                      <strong>Price:</strong>{" "}
                      ₹{book.price}
                    </p>

                    <p>
                      <strong>Stock:</strong>{" "}
                      {book.stockQuantity}
                    </p>
                  </div>

                  <div className="admin-book-actions">
                    <button
                      type="button"
                      onClick={() =>
                        startEditing(book)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteBook(book._id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard