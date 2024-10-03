import Navigation from "./components/Navigation/Navigation.jsx";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage.jsx";
// import MoviesPage from "./pages/MoviesPage/MoviesPage.jsx";
// import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage.jsx";
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
// import MovieCast from "./components/MovieCast/MovieCast.jsx";
// import MovieReviews from "./components/MovieReviews/MovieReviews.jsx";
import { lazy, Suspense } from "react";
import css from "./App.module.css";
import Loader from "./components/Loader/Loader.jsx";

const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage.jsx"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage.jsx"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast.jsx"));
const MovieReviews = lazy(() => import("./components/MovieReviews/MovieReviews.jsx"));


function App() {
  return (
    <>
      <div className={css.fon}></div>
      <Navigation />
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
