document.addEventListener("DOMContentLoaded", function() {
    
    var watchList = JSON.parse(localStorage.getItem('watchlist'));

    function renderMovies(movieArray) {
        
        function addMovieHTML(movie) {
            return `<div class="card mb-2">
                <img class="card-img-top" src="${movie.Poster}"/>

                <div class="card-body">
                    <h1 class="card-title">${movie.Title}</h1>
                    <h4 class="card-text">${movie.Year}</h4>
                    <button onclick="saveToWatchlist('${movie.imdbID}')">Add</button>
                </div>
            </div>`;

        };

        var finalHTML = [];
        
        finalHTML.push(movieArray.map(createHTML))     
        return finalHTML.join("");
    }

    document.getElementsByClassName('movies-container')[0].innerHTML = renderMovies(watchList);

});