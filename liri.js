require("dotenv").config();

// var spotify = new Spotify(keys.spotify);

var command = process.argv;

switch (command[2]) {
    case "concert-this":
        console.log("Find concerts")
        break;
    case "spotify-this-song":
        console.log("Find spotify")
        break;
    case "movie-this":
        console.log("Find las movies");
        break;
    case "do-what-it-says":
        console.log("You can do it yourself")
        break;
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
