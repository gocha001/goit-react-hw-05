import { Form, Formik, Field, ErrorMessage } from "formik";
import MovieList from "../../components/MovieList/MovieList";
import { searchMovies } from "../../services/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error.jsx";
import * as Yup from "yup";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [result, setResult] = useState(null);
  const [pages, setPages] = useState(null);
  const [page, setPage] = useState(1);
  // const [film, setFilm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const film = searchParams.get("query") ?? "";
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [scrTo, setSrcTo] = useState(700);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await searchMovies(film, page );
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
  }, [film, page]);

  const initialValues = {
    query: "",
  };

  const handleSubmit = (values) => {
    console.log(values.query);
    // setFilm(values.query);
    searchQuery(values.query);
    if (!values.query) {
      return setSearchParams({});
    }
    searchParams.set("query", values.query);
    setSearchParams(searchParams);
  };

  const searchQuery = () => {
    setMovies([]);
     setResult(null);
     setPages(null);
     setPage(1);
   };

  const orderSchema = Yup.object().shape({
    query: Yup.string()
      .min(3, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
  });

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    setSrcTo((prev) => prev + 10);
    window.onload();
  };

  window.onload = () => {
    setTimeout(() => {
      window.scrollBy({
        top: scrTo,
        behavior: "smooth",
      });
    }, 500);
  };

  return (
    <div>
      <div className={css.container}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={orderSchema}
        >
          <Form className={css.form}>
            <label className={css.label}>
              <Field className={css.field} name="query" />
              <ErrorMessage
                name="query"
                component="p"
                // style={{ color: "red", fontWeight: 700, fontSize: "40px" }}
                className={css.error}
              />
            </label>
            <button className={css.btn} type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </div>
      {!!movies.length && (
        <MovieList movies={movies} result={result} pages={pages} page={page} />
      )}
      {!!movies.length && page < pages && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} />
      )}
      {isLoading && <Loader />}
      {isError && <Error />}
    </div>
  );
};

export default MoviesPage;
