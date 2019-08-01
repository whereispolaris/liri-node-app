require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const fs = require("fs");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const command = process.argv[2];
const value = process.argv[3];

switch (command) {
    case "concert-this":
        concertThis(value)
        break;
    case "spotify-this-song":
        spotifyThis(value)
        break;
    case "movie-this":
        movieThis(value)
        break;
    case "do-what-it-says":
        whatItSays()
        break;
}

function concertThis(band) {
    axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(function (response) {
        console.log(response.data);
        // * Name of the venue
        // * Venue location
        // * Date of the Event(use moment to format this as "MM/DD/YYYY")
    }).catch(function (error) {
        console.log(error);
    });
}

function spotifyThis(song) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
            // * Artist(s)
            // * The song's name
            // * A preview link of the song from Spotify
            // * The album that the song is from  
        }
        console.log(data.tracks.items[0].artists[0].name);
    });
}

function movieThis(movie) {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("The movie's rating is: " + response.data.imdbRating);
            // * Title of the movie.
            // * Year the movie came out.
            // * IMDB Rating of the movie.
            // * Rotten Tomatoes Rating of the movie.
            // * Country where the movie was produced.
            // * Language of the movie.
            // * Plot of the movie.
            // * Actors in the movie.
        })
        .catch(function (error) {
            console.log(error);
        });
}

function whatItSays() {
    fs.readFile('random.txt', "utf8", (err, data) => {
        if (err) throw err;
        console.log(data);
    });
}


// Commands that will be available:
//  $ concert-this 
//  $ spotify-this-song
//  $ movie-this
//  $ do-what-it-says

// EXAMPLES
//============
// $ node liri.js concert-this <artist/band name here>
    // Search for artis in the Bands in Town Artist Events API
    // console.log the following information:
        // Name of the venue
        // Venue location
        // Date of the Event (use moment to format this as "MM/DD/YYYY")
//
// $ node liri.js spotify-this-song '<song name here>'
    // This will gather the info from node-spotify-api
    // console.log the following information:
        // Artist(s)
        // The song's name
        // A preview link of the song from Spotify
        // The album that the song is from
        // If no song is provided then your program will default to "The Sign" by Ace of Base.
//
// $ node liri.js movie-this '<movie name here>'
    //  This will gather the info from OMDB API
    // console.log the following information:
        // Title of the movie
        // Year the movie came out
        // IMDB Rating of the movie
        // Rotten Tomatoes Rating of the movie
        // Country where the movie was produced
        // Language of the movie
        // Plot of the movie
        // Actors in the movie
        // If no movie is provided, it will default to Mr Nobody. 
//
// $ node liri.js do-what-it-says
    // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
