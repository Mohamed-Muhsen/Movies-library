'use strict';
import { imageBaseURL } from "./api.js";
import { search } from "./search.js";

export function createMovieCard(movie) {
    const {
        poster_path,
        title,
        vote_average,
        release_date,
        id
    } = movie;

    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.innerHTML = `
        <figure class="poster-box card-banner">
            <img src="${imageBaseURL}w342${poster_path}" alt="${title}" class="img-cover" loading="lazy">
        </figure>
        <h4 class="title">${title}</h4>
        <div class="meta-list">
            <div class="meta-item">
                <i class="fa-solid fa-star" id="star" aria-label="Rating"></i>
                <span class="span">${vote_average ? vote_average.toFixed(1) : "N/A"}</span>
            </div>
            <div class="card-badge">${release_date ? release_date.split("-")[0] : "N/A"}</div>
        </div>
        <a href="./detail.html" class="card-btn" title="${title}" onclick="getMovieDetail(${id})"></a>
        `;
    return card;
}

export function createTVShowCard(tvShow) {
    const {
        poster_path,
        name,
        vote_average,
        first_air_date,
        id
    } = tvShow;

    const card = document.createElement("div");
    card.classList.add("movie-card"); 
    card.innerHTML = `
        <figure class="poster-box card-banner">
            <img src="${imageBaseURL}w342${poster_path}" alt="${name}" class="img-cover" loading="lazy">
        </figure>
        <h4 class="title">${name}</h4>
        <div class="meta-list">
            <div class="meta-item">
                <i class="fa-solid fa-star" id="star" aria-label="Rating"></i>
                <span class="span">${vote_average ? vote_average.toFixed(1) : "N/A"}</span>
            </div>
                   
            <div class="card-badge">${first_air_date ? first_air_date.split("-")[0] : "N/A"}</div>
        </div>
        <a href="./detail.html" class="card-btn" title="${name}" onclick="getTVShowDetail(${id})"></a>
    `;
    return card;
}

document.addEventListener("DOMContentLoaded", function() {
    search();
});
