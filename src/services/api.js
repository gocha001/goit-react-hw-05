import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const options = {
  method: "GET",
  params: { api_key: "74aa0754f4315df384db1ec90e4cbdb8" },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NGFhMDc1NGY0MzE1ZGYzODRkYjFlYzkwZTRjYmRiOCIsIm5iZiI6MTcyNzI5MzcwNy41NzU0NzksInN1YiI6IjY2ZjQ2MGQ1NTgyMGQyOGNmYjZhMGQ3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ec12sgb7SmVgChHlZ-H_jcRM5ten8IKp2rfjqx8YlK8",
  },
};

export const fetchMovies = async (page) => {
  const { data } = await axios.get(`trending/movie/day?page=${page}`, options);
  return data;
};

export const searchMovies = async (film, page) => {
  const { data } = await axios.get(
    `search/movie?query=${film}&page=${page}`,
    options
  );
  return data;
};

export const searchMovieById = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}`, options);
  return data;
};

export const searchMovieCastById = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}/credits`, options);
  return data;
};

export const searchMovieReviewsById = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}/reviews`, options);
  return data;
};
