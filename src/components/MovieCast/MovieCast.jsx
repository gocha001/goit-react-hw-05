import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMovieCastById } from "../../services/api";
import css from "./MovieCast.module.css";
import Loader from "../../components/Loader/Loader";
import Error from "../Error/Error.jsx";

const baseUrl = "https://image.tmdb.org/t/p/w500/";
const defaultImg =
  "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

const MovieCast = () => {
  const movieId = useParams();

  const [casts, setCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getCast = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await searchMovieCastById(movieId);
        setCasts(data.cast);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <div>
      {!isLoading ? (
        <ul className={css.list}>
          {casts.map((cast) => (
            <li key={cast.cast_id}>
              <img
                className={css.img}
                src={
                  cast.profile_path
                    ? `${baseUrl}${cast.profile_path}`
                    : defaultImg
                }
                alt={cast.name}
              />
              <div className={css.text}>
                <h2>{cast.name}</h2>
                <h3>Role: {cast.character}</h3>
                <p>Popularity: {cast.popularity}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Unfortunately, there is no information about the actors.</p>
      )}
      {isLoading && <Loader />}
      {isError && <Error />}
    </div>
  );
};

export default MovieCast;
