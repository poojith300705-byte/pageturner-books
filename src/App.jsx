import { useState } from "react"
import { Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import BookList from "./components/BookList"
import BookDetails from "./pages/BookDetails"

function App() {
  const [wishlist, setWishlist] = useState([])

  function addToWishlist(book) {
    if (!wishlist.some((item) => item.id === book.id)) {
      setWishlist([...wishlist, book])
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

        </Routes>
      </main>
    </div>
  )
}

export default App