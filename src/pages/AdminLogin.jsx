import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"

const API_URL = "http://localhost:5002"

function AdminLogin() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setLoading(true)
      setError("")

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        )
      }

      login(data.token, {
        username,
        role: "admin",
      })

      navigate("/admin/add-book")
    } catch (err) {
      setError(
        err.message || "Unable to login"
      )
    } finally {
      setLoading(false)
    }
  }

  if (isAuthenticated) {
    navigate("/admin/add-book")
    return null
  }

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h1>Admin Login</h1>

        <p>
          Sign in to manage PageTurner Books.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </div>

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
              ? "Signing in..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin