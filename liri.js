require("dotenv").config();
var moment = require('moment');
const keys = require("./keys.js");
const axios = require("axios");
const fs = require("fs");
const chalk = require('chalk');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const bandKey = process.env.APP_ID;
const movieKey = process.env.OMDB_KEY

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
    case "what-it-says":
        whatItSays()
        break;
    case "--help":
        instructions();
        break;
    default: instructions();

}

function concertThis(band) {
    axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=" + bandKey).then(function (response) {
        const firstConcert = response.data[0];
        console.log(chalk.red("---------------------------"));
        console.log(chalk.red(band));
        console.log(chalk.red("---------------------------"));
        // * Name of the venue
        console.log(chalk.blue("Venue: ") + chalk.yellow(firstConcert.venue.name));
        // * Venue location
        console.log(chalk.blue("City: ") + chalk.yellow(firstConcert.venue.city + "," + firstConcert.venue.region));
        // * Date of the Event(use moment to format this as "MM/DD/YYYY")
        console.log(chalk.blue("Date: ") + chalk.yellow(moment(firstConcert.datetime).format("MM/DD/YYYY")));
    }).catch(function (error) {
        console.log(error);
    });
}

function spotifyThis(song) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(chalk.red("---------------------------"));
        console.log(chalk.red(data.tracks.items[0].name));
        console.log(chalk.red("---------------------------"));

        // * Artist(s)
        console.log(chalk.blue("Artist: ") + chalk.yellow(data.tracks.items[0].artists[0].name));
        // * The song's name
        console.log(chalk.blue("Song: ") + chalk.yellow((data.tracks.items[0].name)));
        // * A preview link of the song from Spotify
        console.log(chalk.blue("Song Link: ") + chalk.yellow(data.tracks.items[0].artists[0].external_urls.spotify));
        // * The album that the song is from  
        console.log(chalk.blue("Album: ") + chalk.yellow(data.tracks.items[0].album.name));
    });
}

function movieThis(movie) {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + movieKey).then(
        function (response) {
            const movieData = response.data;
            // * Title of the movie.
            console.log(chalk.red("---------------------------"));
            console.log(chalk.red(movieData.Title));
            // * Year the movie came out.
            console.log(chalk.red("---------------------------"));
            console.log(chalk.blue("Year: ") + chalk.yellow(movieData.Year));
            // * IMDB Rating of the movie.
            console.log(chalk.blue("Rating: ") + chalk.yellow(movieData.imdbRating));
            // * Rotten Tomatoes Rating of the movie.
            console.log(chalk.blue("Rotten Tomatoes: ") + chalk.yellow(movieData.Ratings[1].Value));
            // * Country where the movie was produced.
            console.log(chalk.blue("Country: ") + chalk.yellow(movieData.Country));
            // * Language of the movie.
            console.log(chalk.blue("Language: ") + chalk.yellow(movieData.Language));
            // * Plot of the movie.
            console.log(chalk.blue("Plot: ") + chalk.yellow(movieData.Plot));
            // * Actors in the movie.
            console.log(chalk.blue("Actors: ") + chalk.yellow(movieData.Actors));
            console.log("-----------------");
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

function instructions() {
    console.log(chalk.magenta("----------------------"));
    console.log(chalk.magenta("Commands you can run:"));
    console.log(chalk.magenta("----------------------"));
    console.log(chalk.red("concert-this" + chalk.green(" 'ARTIST' ")) + chalk.yellow("to get the the next concert for a band."));
    console.log(chalk.red("spotify-this-song " + chalk.green(" 'SONG' ")) + chalk.yellow("to get the the song from Spotify."));
    console.log(chalk.red("movie-this" + chalk.green(" 'MOVIE' ")) + chalk.yellow("to get information about a movie."));
    console.log(chalk.red("do-what-it-says ") + chalk.yellow("to to run the commands stored in the random.txt file."));
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
