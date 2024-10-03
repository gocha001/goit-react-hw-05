import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMovieReviewsById } from "../../services/api";
import css from "./MovieReviews.module.css";
import Loader from "../../components/Loader/Loader";
import Error from "../Error/Error.jsx";

const MovieReviews = () => {
  const movieId = useParams();

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await searchMovieReviewsById(movieId);
        setReviews(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  return (
    <div>
      <ul className={css.list}>
        {reviews.map((review) => (
          <li key={review.id}>
            <h2>{review.author}</h2>
            <p>{review.content}</p>
            <p>Created at: {review.created_at}</p>
          </li>
        ))}
      </ul>
      {!reviews.length && (
        <p>Unfortunately, there are no reviews for this movie yet.</p>
      )}
      {isLoading && <Loader />}
      {isError && <Error />}
    </div>
  );
};

export default MovieReviews;
