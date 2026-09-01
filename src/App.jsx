import { useState } from "react"
import { Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import BookList from "./components/BookList"
import BookDetails from "./pages/BookDetails"
import AdminLogin from "./pages/AdminLogin"
import AddBook from "./pages/AddBook"
import AdminDashboard from "./pages/AdminDashboard"

function App() {
  const [wishlist, setWishlist] = useState([])

  function addToWishlist(book) {
    const bookId = book.id || book._id

    if (
      !wishlist.some(
        (item) =>
          (item.id || item._id) === bookId
      )
    ) {
      setWishlist((currentWishlist) => [
        ...currentWishlist,
        book,
      ])
    }
  }

  return (
    <div>
      <Header wishlistCount={wishlist.length} />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <BookList
                addToWishlist={addToWishlist}
                wishlist={wishlist}
              />
            }
          />

          <Route
            path="/book/:id"
            element={<BookDetails />}
          />

          <Route
            path="/admin"
            element={<AdminLogin />}
          />

          <Route
            path="/admin/add-book"
            element={<AddBook />}
          />

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App