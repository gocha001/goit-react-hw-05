import MovieList from "../../components/MovieList/MovieList";
import { fetchMovies } from "../../services/api";
import { useEffect, useState } from "react";
import css from "./HomePage.module.css";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error.jsx";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [result, setResult] = useState(null);
  const [pages, setPages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [scrTo, setSrcTo] = useState(700);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchMovies(page);
        setMovies((prev) => [...prev, ...data.results]);
        setResult(data.total_results);
        setPages(data.total_pages);
        setPage(data.page);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    setSrcTo((prev) => prev + 10);
    scrollWindow();
  };

  const scrollWindow = () => {
   setTimeout(() => {
   window.scrollBy({
     top: scrTo,
      behavior: "smooth",
    });
    }, 500);
 };

  return (
    <div>
      <h2 className={css.text}> Trending movies on TMDB</h2>
      {!!movies.length && <MovieList
        movies={movies}
        result={result}
        pages={pages}
        page={page}
      />}
      {!!movies.length && page < pages && (
        <LoadMoreBtn handleLoadMore={handleLoadMore}/>
      )}
      {isLoading && <Loader />}
      {isError && <Error />}
    </div>
  );
};

export default HomePage;
