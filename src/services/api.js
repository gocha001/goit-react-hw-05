import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const options = {
  method: "GET",
  params: {api_key: '74aa0754f4315df384db1ec90e4cbdb8'},
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NGFhMDc1NGY0MzE1ZGYzODRkYjFlYzkwZTRjYmRiOCIsIm5iZiI6MTcyNzI5MzcwNy41NzU0NzksInN1YiI6IjY2ZjQ2MGQ1NTgyMGQyOGNmYjZhMGQ3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ec12sgb7SmVgChHlZ-H_jcRM5ten8IKp2rfjqx8YlK8",
  },
};

export const fetchMovies = async (page) => {
  const url =
    `trending/movie/day?page=${page}`;

  const { data } = await axios.get(url, options);
  return data;
};

export const searchMovies = async (film, page) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${film}&page=${page}`;

  const { data } = await axios.get(url, options);
  return data;
};

export const searchMovieById = async (movieId) => {
  const id = Number(movieId.movieId);
  const url =
    `https://api.themoviedb.org/3/movie/${id}`;
  const { data } = await axios.get(url, options);
  return data;
}

export const searchMovieCastById = async (movieId) => {
  const id = Number(movieId.movieId);
  const url = `https://api.themoviedb.org/3/movie/${id}/credits`;
  const { data } = await axios.get(url, options);
  return data;
};

export const searchMovieReviewsById = async (movieId) => {
  const id = Number(movieId.movieId);
  const url = `https://api.themoviedb.org/3/movie/${id}/reviews`;
  const { data } = await axios.get(url, options);
  return data;
};