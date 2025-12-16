import { searchMovies } from "./api.js";

const form = document.querySelector("#searchForm");
const input = document.querySelector("#q");
const results = document.querySelector("#results");
const loadMoreBtn = document.querySelector("#moreResults");
let currentQuery = "";
let currentPage = 1;

function createCard(movie) {
  const a = document.createElement("a");
  a.href = `movie.html?id=${movie.imdbID}`;
  a.className = "card";

  const img = document.createElement("img");
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

async function doSearch(query, page = 1, append = false) {
  if (!query) {
    results.innerHTML = "";
    loadMoreBtn.style.display = "none";
    return;
  }
  try {
    const res = await searchMovies(query, page);
    if (!append) results.innerHTML = "";
    if (res && res.Search) {
      res.Search.forEach((m) => results.appendChild(createCard(m)));
      loadMoreBtn.style.display =
        res.totalResults > page * 10 ? "block" : "none";
    } else {
      results.innerHTML = "<p>Aucun résultat</p>";
      loadMoreBtn.style.display = "none";
    }
  } catch (e) {
    console.error(e);
  }
}

let debounceTimer;
input.addEventListener("input", (e) => {
  const q = e.target.value.trim();
  currentQuery = q;
  currentPage = 1;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => doSearch(q, 1, false), 350);
});

form.addEventListener("submit", (e) => e.preventDefault());

loadMoreBtn.addEventListener("click", () => {
  currentPage++;
  doSearch(currentQuery, currentPage, true);
});

document.addEventListener("DOMContentLoaded", () => {
  loadMoreBtn.style.display = "none";
});
