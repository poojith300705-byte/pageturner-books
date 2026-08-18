function Header({ wishlistCount }) {
  return (
    <header>
      <div>
        <h1>📚 PageTurner Books</h1>
        <p>Discover your next great read.</p>
      </div>

      <div>
        <h3>❤️ Wishlist: {wishlistCount}</h3>
      </div>
    </header>
  )
}

export default Header