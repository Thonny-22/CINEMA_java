import { getMovieById } from "./api.js";

function fmtDate(raw) {
  if (!raw || raw === "N/A") return "Non disponible";
  const d = new Date(raw);
  if (isNaN(d)) return raw;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

async function render() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;
  const data = await getMovieById(id);
  const container = document.querySelector("main");
  if (!data || data.Response === "False") {
    container.innerHTML = "<p>Film introuvable</p>";
    return;
  }

  const posterHtml =
    data.Poster && data.Poster !== "N/A"
      ? `<img src="${data.Poster}" alt="Poster ${data.Title}">`
      : `<div class="no-poster large" aria-hidden="true">Pas d'affiche</div>`;

  const html = `
    <article class="movie-detail">
      <h1>${data.Title}</h1>
      <div class="movie-grid">
        ${posterHtml}
        <div class="meta">
          <p><strong>Genre :</strong> ${data.Genre}</p>
          <p><strong>Acteurs :</strong> ${data.Actors}</p>
          <p><strong>Date DVD :</strong> ${fmtDate(data.DVD)}</p>
          <p><strong>Notes :</strong> ${
            Array.isArray(data.Ratings)
              ? data.Ratings.map((r) => `${r.Source}: ${r.Value}`).join(" | ")
              : "Non disponible"
          }</p>
        </div>
      </div>
      <section class="plot"><h2>Synopsis</h2><p>${data.Plot}</p></section>
    </article>
  `;
  container.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", render);
