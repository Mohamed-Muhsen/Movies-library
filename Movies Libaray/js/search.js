'use strict';

import { api_key, fetchDataFromServer } from "./api.js";
import { createMovieCard, createTVShowCard } from "./movie-card.js";

export function search() {
    const searchWrapper = document.querySelector("[search-wrapper]");
    const searchField = document.querySelector("[search-field]");
    const searchResultModal = document.createElement("div");
    searchResultModal.classList.add("search-modal");
    document.querySelector("main").appendChild(searchResultModal);

    let searchTimeout;

    searchField.addEventListener("input", function() {
        if (!searchField.value.trim()) {
            searchResultModal.classList.remove("active");
            searchWrapper.classList.remove("searching");
            clearTimeout(searchTimeout);
            return;
        }

        searchWrapper.classList.add("searching");
        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(function() {
            // البحث عن الأفلام
            fetchDataFromServer(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchField.value}&include_adult=false&page=1`, function({ results: movieList }) {
                searchWrapper.classList.remove("searching");
                searchResultModal.classList.add("active");
                searchResultModal.innerHTML = "";

                searchResultModal.innerHTML += `
                    <p class="label">Results for</p>
                    <h1 class="heading">${searchField.value}</h1>
                    <div class="movie-list">
                        <div class="grid-list"></div>
                    </div>
                `;

                for (const movie of movieList) {
                    const movieCard = createMovieCard(movie);
                    searchResultModal.querySelector(".grid-list").appendChild(movieCard);
                }
            });

            // البحث عن المسلسلات
            fetchDataFromServer(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${searchField.value}&include_adult=false&page=1`, function({ results: tvShowList }) {
                searchWrapper.classList.remove("searching");
                searchResultModal.classList.add("active");

                if (!tvShowList.length) return;

                searchResultModal.innerHTML += `
                    <p class="label">TV Shows for</p>
                    <div class="tv-show-list">
                        <div class="grid-list"></div>
                    </div>
                `;

                for (const tvShow of tvShowList) {
                    const tvShowCard = createTVShowCard(tvShow);
                    searchResultModal.querySelector(".grid-list").appendChild(tvShowCard);
                }
            });

        }, 500);
    });
}
