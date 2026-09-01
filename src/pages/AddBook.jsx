import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"

const API_URL = "http://localhost:5002"

function AddBook() {
  const navigate = useNavigate()
  const { token, isAuthenticated } = useAuth()

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
    coverImage: "",
    stockQuantity: "",
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <div className="admin-card">
          <h1>Authentication Required</h1>
          <p>Please log in as an administrator first.</p>

          <button onClick={() => navigate("/admin")}>
            Go to Admin Login
          </button>
        </div>
      </div>
    )
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setLoading(true)
      setMessage("")
      setError("")

      const response = await fetch(
        `${API_URL}/api/books`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            author: formData.author,
            genre: formData.genre,
            price: Number(formData.price),
            coverImage: formData.coverImage,
            stockQuantity: Number(formData.stockQuantity),
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to add book"
        )
      }

      setMessage("Book added successfully!")

      setFormData({
        title: "",
        author: "",
        genre: "",
        price: "",
        coverImage: "",
        stockQuantity: "",
      })
    } catch (err) {
      setError(
        err.message || "Unable to add book"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h1>Add New Book</h1>

        <p>
          Add a new book to the PageTurner catalog.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>

            <input
              id="author"
              name="author"
              type="text"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre</label>

            <input
              id="genre"
              name="genre"
              type="text"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>

            <input
              id="price"
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="coverImage">
              Cover Image URL
            </label>

            <input
              id="coverImage"
              name="coverImage"
              type="url"
              value={formData.coverImage}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="stockQuantity">
              Stock Quantity
            </label>

            <input
              id="stockQuantity"
              name="stockQuantity"
              type="number"
              min="0"
              value={formData.stockQuantity}
              onChange={handleChange}
              required
            />
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

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Adding Book..."
              : "Add Book"}
          </button>
        </form>

        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/")}
        >
          Back to Catalog
        </button>
      </div>
    </div>
  )
}

export default AddBook