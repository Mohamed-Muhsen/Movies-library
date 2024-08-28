'use strict'

import { api_key, imageBaseURL, fetchDataFromServer } from "./api.js"
import { sidebar } from "./sidebar.js"
import { createMovieCard } from "./movie-card.js"
import { search } from "./search.js";

const movieId = window.localStorage.getItem("movieId");
const pageContent = document.querySelector("[page-content]");

sidebar();

const getGenres = function(genreList) {
    return genreList.map(({ name }) => name).join(", ");
}

const getCasts = function(castList) {
    return castList.slice(0, 10).map(({ name }) => name).join(", ");
}

const getDirectors = function(crewList) {
    return crewList.filter(({ job }) => job === "Director").map(({ name }) => name).join(", ");
}

const filterVideos = function(videoList) {
    return videoList.filter(({ type, site }) => (type === "Trailer" || type === "Teaser") && site === "YouTube");
}

fetchDataFromServer(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&append_to_response=casts,videos,images,releases`, function(movie) {
    const {
        backdrop_path,
        poster_path,
        title,
        release_date,
        runtime,
        vote_average,
        releases: { countries: [{ certification }] },
        genres,
        overview,
        casts: { cast, crew },
        videos: { results: videos }
    } = movie;

    document.title = `${title} - Movatv`;

    const movieDetail = document.createElement("div");
    movieDetail.classList.add("movie-detail");

    movieDetail.innerHTML = `
        <div class="backdrop-image" style="background-image: url('${imageBaseURL}w1280${backdrop_path}')"></div>

        <figure class="poster-box movie-poster">
            <img src="${imageBaseURL}w342${poster_path}" alt="${title} poster" class="img-cover">
        </figure>

        <div class="detail-box">
            <div class="detail-content">
                <h1 class="heading">${title}</h1>

                <div class="meta-list">
                    <div class="meta-item">
                        <i class="fa-solid fa-star rating-icon" aria-label="Rating"></i>
                        <span class="span">${vote_average.toFixed(1)}</span>
                    </div>

                    <div class="separator"></div>
                    <div class="meta-item">${runtime}m</div>
                    <div class="separator"></div>
                    <div class="meta-item">${release_date.split("-")[0]}</div>
                    <div class="meta-item card-badge">${certification}</div>
                    <div class="watchlist">
                        <button id="addToWatchlist" aria-label="Add to Watchlist">
                         <h4 class"title-large">Add to Watchlist</h4><i class="fa-solid fa-bookmark"></i>
                        </button>
                    </div>
                </div>

                <div class="genre">${getGenres(genres)}</div>
                <p class="overview">${overview}</p>
                <ul class="detail-list">
                    <div class="list-item">
                        <p class="list-name">Starring</p>
                        <p>${getCasts(cast)}</p>
                    </div>

                    <div class="list-item">
                        <p class="list-name">Directed By</p>
                        <p>${getDirectors(crew)}</p>
                    </div>
                </ul>
            </div>

            <div class="title-wrapper">
                <h3 class="title-large">Trailers and Clips</h3>
            </div>

            <div class="slider-list">
                <div class="slider-inner"></div>
            </div>
        </div>
    `;

    for (const { key, name } of filterVideos(videos)) {
        const videoCard = document.createElement("div");
        videoCard.classList.add("video-card");
        videoCard.innerHTML = `
            <iframe width="500" height="294" src="https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0" frameborder="0" allowfullscreen="1" title="${name}" class="img-cover" loading="lazy"></iframe>
        `;
        movieDetail.querySelector(".slider-inner").appendChild(videoCard);
    }

    pageContent.appendChild(movieDetail);
    fetchDataFromServer(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${api_key}&page=1`, addSuggestedMovies);

    document.getElementById('addToWatchlist').addEventListener('click', () => {
        const movieData = {
            id: movieId,
            title: title,
            poster_path: poster_path,
            backdrop_path: backdrop_path
        };
    
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        
        const isMovieInWatchlist = watchlist.some(item => item.id === movieData.id);
        if (!isMovieInWatchlist) {
            watchlist.push(movieData);
            
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            
            Toastify({
                text: "Movie added to Watchlist!",
                duration: 4000, 
                close: true,
                gravity: "bottom",
                position: "right", 
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", 
                stopOnFocus: true 
            }).showToast();
        } else {
            Toastify({
                text: "Movie is already in your Watchlist.",
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "right",
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
                stopOnFocus: true
            }).showToast();
        }
    });
});

const addSuggestedMovies = function ({ results: movieList }) {
    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list");
    movieListElem.ariaLabel = "You May Also Like";

    movieListElem.innerHTML = `
        <div class="title-wrapper">
            <h3 class="title-large">You May Also Like</h3>
        </div>
        <div class="slider-list">
            <div class="slider-inner"></div>
        </div>
    `;
    for (const movie of movieList) {
        const movieCard = createMovieCard(movie);
        movieListElem.querySelector(".slider-inner").appendChild(movieCard);
    }

    pageContent.appendChild(movieListElem);
}

document.addEventListener('DOMContentLoaded', () => {
    search();
});
