import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css"

const MovieList = ({ movies, result, pages, page }) => {
  
  const location = useLocation();


  return (
    <div className={css.container} >
      <ul className={css.item} >
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>
              <p className={css.text} >{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className={css.stat} >
        <p>Result: {result}</p>
        <p>Pages: {pages}</p>
        <p>Page: {page}</p>
      </div>
    </div>
  );
}

export default MovieList

