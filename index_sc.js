import { searchMovies } from "./api.js";

const trendingTitles = [
  "Guardians of the Galaxy",
  "Inception",
  "The Matrix",
  "Interstellar",
  "The Dark Knight",
  "Back to the Future",
  "Pulp Fiction",
  "The Lord of the Rings: The Fellowship of the Ring",
  "The Avengers",
  "Parasite",
];

const container = document.querySelector(".affiche");
const loadBtn =
  document.querySelector("#loadMore") || document.querySelector("button");
let nextIndex = 0; // pointer into trendingTitles for infinite loading
const perLoad = 3;

function createCard(movie) {
  const a = document.createElement("a");
  a.href = `movie.html?id=${movie.imdbID}`;
  a.className = "card";

  let media;
  if (movie.Poster && movie.Poster !== "N/A") {
    const img = document.createElement("img");
    img.src = movie.Poster;
    img.alt = `${movie.Title} poster`;
    media = img;
  } else {
    const div = document.createElement("div");
    div.className = "no-poster";
    div.setAttribute("aria-hidden", "true");
    div.textContent = "Pas d'affiche";
    media = div;
  }

  const h = document.createElement("h3");
  h.textContent = movie.Title;

  a.appendChild(media);
  a.appendChild(h);
  return a;
}

async function loadMore() {
  for (let i = 0; i < perLoad; i++) {
    const title = trendingTitles[nextIndex % trendingTitles.length];
    try {
      const res = await searchMovies(title, 1);
      if (res && res.Search && res.Search.length > 0) {
        const movie = res.Search[0];
        container.appendChild(createCard(movie));
      }
    } catch (e) {
      console.error(e);
    }
    nextIndex++;
  }
  // never hide load button — allow infinite loading (may repeat titles)
}

loadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loadMore();
});

// initial load
document.addEventListener("DOMContentLoaded", () => {
  loadMore();
});
