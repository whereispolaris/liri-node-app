require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var command = process.argv;

switch (command[2]) {
    case "concert-this":
        concertThis(command[3])
        break;
    case "spotify-this-song":
        spotifyThis(command[3]);
        break;
    case "movie-this":
        movieThis(command[3])
        break;
    case "do-what-it-says":
        console.log("You can do it yourself")
        break;
}

function concertThis(band) {
    axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.log(error);
    });
}

function movieThis(movie) {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("The movie's rating is: " + response.data.imdbRating);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function spotifyThis(song) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
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
