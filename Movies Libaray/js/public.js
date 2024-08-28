'use strict';

const addEventOnElements = function (elements, eventType, callback){
    for (const elem of elements) elem.addEventListener(eventType, callback);
}

const searchBox = document.querySelector("[search-box]");
const seachTogglers = document.querySelectorAll("[search-toggler]");

addEventOnElements(seachTogglers, "click", function(){
    searchBox.classList.toggle("active");
});


const getMovieDetail = function(movieId){
    window.localStorage.setItem("movieId", String(movieId));
}  


const getMovieList = function(urlParam, genreName){
    window.localStorage.setItem("urlParam", urlParam);
    window.localStorage.setItem("genreName", genreName);
}


const dropdownButton = document.querySelector('.dropdown-mode .dropdown-button');
const dropdownContent = document.querySelector('.dropdown-mode .dropdown-content');

dropdownButton.addEventListener('click', () => {
    dropdownContent.classList.toggle('show');
});

document.getElementById('light-mode').addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 'light');
    dropdownContent.classList.remove('show');
});

document.getElementById('dark-mode').addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    dropdownContent.classList.remove('show');
});

document.getElementById('reset-mode').addEventListener('click', () => {
    document.documentElement.removeAttribute('data-theme');
    dropdownContent.classList.remove('show');
});

// Close the dropdown if clicked outside
window.addEventListener('click', (event) => {
    if (!event.target.matches('.dropdown-mode .dropdown-button')) {
        if (dropdownContent.classList.contains('show')) {
            dropdownContent.classList.remove('show');
        }
    }
});
