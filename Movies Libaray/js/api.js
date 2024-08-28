'use strict';

const api_key = '11110e6eb6be2134f7dfcd5b10300b79';
const imageBaseURL = 'https://image.tmdb.org/t/p/';

const fetchDataFromServer = function (url , callback ,optionalParam){
    fetch(url) 
    .then(response => response.json())
    .then(data => callback(data , optionalParam));
}

export {imageBaseURL, api_key, fetchDataFromServer} 
