'use strict';

import { api_key, fetchDataFromServer } from "./api.js";
import { search } from "./search.js";

export function sidebar() {
    const genreList = {};

    fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, function({ genres }) {
        for (const { id, name } of genres) {
            genreList[id] = name;
        }
        genreLink();
    });

    const sidebarInner = document.createElement("div");
    sidebarInner.classList.add("sidebar-inner");
    sidebarInner.innerHTML = `
        <div class="sidebar-list">
                <a href="./watchlist.html" id="watchside" class="sidebar-link" menu-close>Watchlist</a>
            <p class="title">Genre</p>
        </div>
        <div class="sidebar-list">
        <p class="title">Language</p>
            <a href="./movie-list.html" class="sidebar-link" menu-close onclick='getMovieList("with_original_language=ar", "Arabic")'>Arabic</a>
            <a href="./movie-list.html" class="sidebar-link" menu-close onclick='getMovieList("with_original_language=en", "English")'>English</a>
            <a href="./movie-list.html" class="sidebar-link" menu-close onclick='getMovieList("with_original_language=fr", "French")'>French</a>
            <a href="./movie-list.html" class="sidebar-link" menu-close onclick='getMovieList("with_original_language=zh", "Chinese")'>Chinese</a>
            <a href="./movie-list.html" class="sidebar-link" menu-close onclick='getMovieList("with_original_language=ko", "Korean")'>Korean</a>
            <a href="./movie-list.html" class="sidebar-link" menu-close onclick='getMovieList("with_original_language=hi", "Hindi")'>Hindi</a>
            <a href="./movie-list.html" class="sidebar-link" menu-close onclick='getMovieList("with_original_language=es", "Spanish")'>Spanish</a>
            <a href="./movie-list.html" class="sidebar-link" menu-close onclick='getMovieList("with_original_language=de", "German")'>German</a>
            <a href="./movie-list.html" class="sidebar-link" menu-close onclick='getMovieList("with_original_language=ja", "Japanese")'>Japanese</a>
            <a href="./movie-list.html" class="sidebar-link" menu-close onclick='getMovieList("with_original_language=it", "Italian")'>Italian</a>
            <a href="./movie-list.html" class="sidebar-link" menu-close onclick='getMovieList("with_original_language=pt", "Portuguese")'>Portuguese</a>
            <a href="./movie-list.html" class="sidebar-link" menu-close onclick='getMovieList("with_original_language=ru", "Russian")'>Russian</a>
            <a href="./movie-list.html" class="sidebar-link" menu-close onclick='getMovieList("with_original_language=tr", "Turkish")'>Turkish</a>
            <a href="./movie-list.html" class="sidebar-link" menu-close onclick='getMovieList("with_original_language=sv", "Swedish")'>Swedish</a>
            <a href="./movie-list.html" class="sidebar-link" menu-close onclick='getMovieList("with_original_language=fa", "Persian")'>Persian</a>
        </div>
        <div class="sidebar-footer">
            <p class="copyright">Copyright &copy; 2024 MovaTv. <br> All Rights Reserved.</p>
            <img src="image/logo1.png" width="130" height="17" alt="TMDB">
        </div>
    `;

    const genreLink = function() {
        for (const [genreId, genreName] of Object.entries(genreList)) {
            const link = document.createElement("a");
            link.classList.add("sidebar-link");
            link.setAttribute("href", "./movie-list.html");
            link.setAttribute("menu-close", "");
            link.setAttribute("onclick", `getMovieList("with_genres=${genreId}", "${genreName}")`);
            link.textContent = genreName;
            sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link);
        }

        const sidebar = document.querySelector("[sidebar]");
        sidebar.appendChild(sidebarInner);
        toggleSidebar(sidebar);
    };

    const toggleSidebar = function(sidebar) {
        const sidebarBtn = document.querySelector("[menu-btn]");
        const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
        const sidebarClose = document.querySelectorAll("[menu-close]");
        const overlay = document.querySelector("[overlay]");

        addEventOnElement(sidebarTogglers, "click", function() {
            sidebar.classList.toggle("active");
            sidebarBtn.classList.toggle("active");
            overlay.classList.toggle("active");
        });

        addEventOnElement(sidebarClose, "click", function() {
            sidebar.classList.remove("active");
            sidebarBtn.classList.remove("active");
            overlay.classList.remove("active");
        });
    };

    const addEventOnElement = function(elements, eventType, callback) {
        elements.forEach(element => {
            element.addEventListener(eventType, callback);
        });
    };
}
search();
