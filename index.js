document.addEventListener("DOMContentLoaded", function() { //document ready block
    
    // localStorage.clear(); clear localStorage

    function renderMovies(movieArray) {  

        function createHTML(movie) {
            return `<div class="card mb-3">
                <img class="card-img-top" src="${movie.Poster}"/>

                <div class="card-body">
                    <h1 class="card-title">${movie.Title}</h1>
                    <h4 class="card-text">${movie.Year}</h4>
                    <button onclick="saveToWatchlist('${movie.imdbID}')"> <span class="add-symbol">+</span> ADD<span class="empty-space">+</span></button>
                </div>
            </div>`;
        }

            moviesHTML = movieArray.map(createHTML); 
            return moviesHTML.join("");

    };
    // let content = document.querySelector(".movies-container");

    // document.getElementById("search-form").addEventListener("submit", function(e) {
    //     e.preventDefault();
    //     content.innerHTML = renderMovies(movieArray);
    //     });
    //


    // Part 3 OMDB API 
    document.getElementById("search-form").addEventListener("submit", function (e) {
        e.preventDefault();

        createHTML =[]

        let searchString = $(".search-bar").val().toLowerCase();
        let urlEncodedSearchString = encodeURIComponent(searchString);

        axios.get("http://www.omdbapi.com/?apikey=3430a78&s=" + urlEncodedSearchString)
            .then(function(response) {
                console.log(response.data)
                
                createHTML.push(response.data.Search);
                document.getElementsByClassName("movies-container")[0].innerHTML = renderMovies(response.data.Search);
            
            
            })


    })

    

});


function saveToWatchlist(imdbID) { 

    var movie = createHTML.find(function(currentMovie) { // variable move contains the rest of this movie’s data
    return currentMovie.imdbID == imdbID;
    });

    var watchlistJSON = localStorage.getItem("watchlist");  // get watchlist from local storage
    var watchlist = JSON.parse(watchlistJSON); //Parse the watchlist with JSON
    
    if (watchlist == null) { //check if the watchlist is null
        watchlist = []; // if null, set to empty array
    }

    watchlist.push(movie); //push movie into watchlist
    watchlistJSON = JSON.stringify(watchlist); // turn watchlist back into JSON
    localStorage.setItem("watchlist", watchlistJSON); // Save the JSONified watchlist back into local storage
};








