# liri-node-app

Language Interpretation and Recognition Interface (LIRI). A command line node app that takes in parameters and returns data. It searches Spotify for songs, Bands in Town for concerts, and OMDB for movies. 

Technologies Used:
- [Node.js](https://nodejs.org/en/)
- [Axios](https://www.npmjs.com/package/axios) HTTP Client
- [Moment](https://www.npmjs.com/package/moment), a JavaScript date library for parsing, validating, manipulating, and formatting dates.
- [Chalk](https://www.npmjs.com/package/chalk)

APIs Used:
- [OMDB API](http://www.omdbapi.com/)
- [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
- [node-spotify-api ](https://www.npmjs.com/package/node-spotify-api)

![LIRI Node Demo](https://santiagoenciso.com/img/liriDemo.gif "LIRI Node Demo")

Full Video Demo: https://santiagoenciso.com/videos/liri-full-demo.mov

Commands:

```
$ concert-this 'ARTIST'
$ spotify-this-song  'SONG'
$ movie-this 'MOVIE'
$ what-it-says
```

## Installation

- Clone GitHub repo.
- Get keys from the APIs listed above.
- Create .env file and add the keys to the file with this template:

```
# Spotify API keys
SPOTIFY_ID=XXXXX
SPOTIFY_SECRET=XXXX

# Bands In Town API Key
APP_ID=XXXXX

# OMDB API Key
OMDB_KEY=XXXXX

```

- Install npm dependencies:

```
$ npm install
```
- Enjoy!
