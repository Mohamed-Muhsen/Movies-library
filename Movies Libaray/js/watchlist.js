document.addEventListener('DOMContentLoaded', () => {
    const watchlistContainer = document.getElementById('watchlist');

    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    
    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = "<p>Your watchlist is empty.</p>";
        return;
    }
    

    const imageBaseURL = "https://image.tmdb.org/t/p/";

    watchlist.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-item');
        movieElement.innerHTML = `
            <figure class="poster-box card-banner">
                <img src="${imageBaseURL}w342${movie.poster_path}" alt="${movie.title}" class="img-cover" loading="lazy">
            </figure>
            <h4 class="title">${movie.title}</h4>
            <button id="addToWatchlist" class="remove-btn" data-id="${movie.id}">
                <h4 class"title-large">Remove</h4>
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        watchlistContainer.appendChild(movieElement);
    });

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const movieId = e.target.getAttribute('data-id');
            removeMovieFromWatchlist(movieId);
        });
    });
});

function removeMovieFromWatchlist(movieId) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    
    watchlist = watchlist.filter(movie => movie.id !== movieId);
    
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    
    window.location.reload();
}

function saveMovieId(movieId) {
    localStorage.setItem('movieId', movieId);
}
search();
