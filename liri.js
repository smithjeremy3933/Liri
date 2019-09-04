let inquirer = require("inquirer");
let env = require("dotenv").config();
var keys = require("./keys.js");
let axios = require("axios");
let Spotify = require('node-spotify-api');
let moment = require("moment");
var fs = require("fs");
let movieName ="";
let artistName="";
let songName="";
let Selector = process.argv[2];
var nodeArgs = process.argv;

function updateArtist () {
    for (var k = 3; k < nodeArgs.length; k++) {

        if (k > 3 && k < nodeArgs.length) {
          artistName = artistName + "+" + nodeArgs[k];
        } else {
          artistName += nodeArgs[k];
      
        }
    };
    if (Selector === "concert-this") {
        let queryURLband = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
        axios.get(queryURLband).then(
            function(response) {
            for (let j=0; j<20;j++){
                var gmtDateTime = moment.utc(response.data[j].datetime, "YYYY-MM-DD HH");
                var local = gmtDateTime.local().format('MM/DD/YYYY h:mm A');
                console.log(`Name of Venue: ${response.data[j].venue.name}\nVenue Location: ${response.data[j].venue.city}, ${response.data[j].venue.country}\nDate: ${local}`);
                console.log("-------------------------------------------------------------");
            }
            })
            .catch(function(error) {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                c.onsole.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
              }
              console.log(error.config);
            });
    }
};

function updateMovie () {
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
          movieName = movieName + "+" + nodeArgs[i];
        } else {
          movieName += nodeArgs[i];
      
        }
    };
    if (Selector === "movie-this" && movieName !== "") {
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=380b9d92";
        
        axios.get(queryUrl).then(
          function(response) {
            console.log(`Title: ${response.data.Title}\nReleased: ${response.data.Released}\nIMDB Rating: ${response.data.imdbRating}\nRotten Tomatoes Rating: ${response.data.Ratings[1].Value}\nProduced in: ${response.data.Country}\nLanguage(s): ${response.data.Language}\nPlot: ${response.data.Plot}\nActors: ${response.data.Actors}`);
          })
          .catch(function(error) {
            if (error.response) {
              console.log("---------------Data---------------");
              console.log(error.response.data);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an object that comes back with details pertaining to the error that occurred.
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
      
    }else if (Selector=== "movie-this" && movieName === "") {
        var queryUr2 = "http://www.omdbapi.com/?t=" + "Mr.Nobody" + "&y=&plot=short&apikey=380b9d92";
    
        axios.get(queryUr2).then(
            function(response) {
              console.log(`Title: ${response.data.Title}\nReleased: ${response.data.Released}\nIMDB Rating: ${response.data.imdbRating}\nRotten Tomatoes Rating: ${response.data.Ratings[1].Value}\nProduced in: ${response.data.Country}\nLanguage(s): ${response.data.Language}\nPlot: ${response.data.Plot}\nActors: ${response.data.Actors}`);
            })
            .catch(function(error) {
              if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
              }
              console.log(error.config);
            });
    }
;
};

function updateSong () {
    for (var l = 3; l < nodeArgs.length; l++) {

        if (l > 3 && l < nodeArgs.length) {
          songName = songName + "+" + nodeArgs[l];
        } else {
          songName += nodeArgs[l];
      
        }
    };
    if(Selector=== "spotify-this-song" && songName !== "") {
        var spotify = new Spotify(keys.spotify);
           
          spotify.search({ type: 'track', query: `${songName}`, limit: 1 }, function(err, response, callback) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
        console.log(`Artist/Band's name: ${response["tracks"].items[0].artists[0].name}`);
        console.log(`Name of the Song: ${response["tracks"].items[0].name}`);
        console.log(`Link to song on Spotify: ${response["tracks"].items[0].artists[0].external_urls.spotify}`);
        console.log(`From the Album: ${response["tracks"].items[0].album.name}`);
          });
    }else if (Selector=== "spotify-this-song" && songName === "") {
        var spotify = new Spotify(keys.spotify);
          spotify.search({ type: 'track', query: 'The Sign', limit: 1 }, function(err, response, callback) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
        console.log(`Artist/Band's name: ${response["tracks"].items[0].artists[0].name}`);
        console.log(`Name of the Song: ${response["tracks"].items[0].name}`);
        console.log(`Link to song on Spotify: ${response["tracks"].items[0].preview_url}`);
        console.log(`From the Album: ${response["tracks"].items[0].album.name}`);
          });
    }
};

function updateText () {
    if (Selector === "do-what-it-says") {
       
        console.log('Usage: node ' + 'liri.js' + ' random.txt');
        process.exit(1);
        filename = process.argv[2];
        fs.readFile(filename, "utf8", function(err, data) {
            if (err) throw err;
            console.log('OK: ' + filename);
            console.log(data)
          });
    }
}
updateText();
updateMovie();
updateArtist();
updateSong();