function GenreFilter({ selectedGenre, setSelectedGenre }) {
    const genres = ["All", "Fiction", "Self Help", "Finance", "Fantasy"]
  
    return (
      <div className="genre-filter">
        <h3>Filter by Genre</h3>
  
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    )
  }
  
  export default GenreFilter