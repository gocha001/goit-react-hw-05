import { useState, useEffect, useRef, Suspense } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { searchMovieById } from "../../services/api.js";
import css from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error.jsx";
import ScrollUp from "../../components/ScrollUp/ScrollUp.jsx";

const baseUrl = "https://image.tmdb.org/t/p/w500/";
const defaultImg = "//dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poste";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/movies");
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [scr, setScr] = useState(0);

  window.onscroll = () => {
    if (window.scrollY > 400) {
      setScr(1);
    } else {
      setScr(0);
    }
  };

  useEffect(() => {
    const getMovie = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await searchMovieById(movieId);
        setMovie(data);
        setGenres(data.genres);
        setCountry(data.origin_country);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovie();
  }, [movieId]);

  return (
    <div className={css.movie}>
      <div>
        {!isLoading && (
          <img
            className={css.img}
            src={
              movie.poster_path ? `${baseUrl}${movie.poster_path}` : defaultImg
            }
            alt={movie.title}
          />
        )}
        {isLoading && <Loader />}
      </div>
      <div className={css.text}>
        <h2>{movie.title}</h2>
        <p>Genres: {genres.map((genre) => genre.name).join(", ")}</p>
        <p>Country: {country.join(", ")}</p>
        <p>Release date: {movie.release_date}</p>
        <p>Overview: {movie.overview}</p>
        <p>Popularity: {movie.popularity}</p>
        <hr />
        <div className={css.links}>
          <NavLink
            to="cast"
            className={({ isActive }) => (isActive ? css.active : css.link)}
          >
            Cast
          </NavLink>
          <NavLink
            to="reviews"
            className={({ isActive }) => (isActive ? css.active : css.link)}
          >
            Reviews
          </NavLink>
          <Link to={goBackRef.current} className={css.link}>
            Go back
          </Link>
        </div>
        {!!scr && <ScrollUp />}
        {isError && <Error />}
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
