import { Link, useNavigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"

function Header({ wishlistCount }) {
  const navigate = useNavigate()

  const { isAuthenticated, logout } = useAuth()

  function handleLogout() {
    logout()
    navigate("/")
  }

  return (
    <header>
      <div>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <h1>📚 PageTurner Books</h1>
        </Link>

        <p>Discover your next great read.</p>
      </div>

      <div>
        <h3>❤️ Wishlist: {wishlistCount}</h3>

        {isAuthenticated ? (
          <div className="header-actions">
            <Link to="/admin/dashboard">
              <button type="button">
                Dashboard
              </button>
            </Link>

            <Link to="/admin/add-book">
              <button type="button">
                Add Book
              </button>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/admin">
            <button type="button">
              Admin Login
            </button>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header