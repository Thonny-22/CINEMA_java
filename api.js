const API_KEY = "c82d0c44";
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(query, page = 1) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
  );
  const data = await response.json();
  return data;
}

export async function getMovieById(id) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`
  );
  const data = await response.json();
  return data;
}
