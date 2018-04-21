require('dotenv').config();

var keys = require('./keys');
var fs = require('fs');
var request = require('request');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdb = keys.omdb;

var command = process.argv[2];
var value = process.argv[3];

//function to log data to text file
function logText(data) {
  fs.appendFile('log.txt', JSON.stringify(data) + '\n', function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('data logged');
  });
}
//function to search song title
function spotifySong() {
  var songTitle = '';

  if (value === undefined) {
    songTitle = 'ace of base';
  } else {
    songTitle = value;
  }
  spotify
    .search({ type: 'track', query: songTitle, limit: 5 })
    .then(function(data) {
      var singles = data.tracks.items;
      var data = [];
      for (var i = 0; i < singles.length; i++) {
        data.push({
          song: singles[i].name,
          artist: singles[i].artists.name,
          album: singles[i].album.name,
          preview_link: singles[i].preview_url
        });
      }
      console.log(data);
      logText(data);
    })
    .catch(function(err) {
      console.log(err);
    });
}

//function to pull tweets
function myTweets() {
  var params = { screen_name: 'jake_connekt' };
  client.get('statuses/user_timeline', params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      var data = [];
      for (var i = 0; i < tweets.length; i++) {
        data.push({
          created_at: tweets[i].created_at,
          '@jake_connekt': tweets[i].text
        });
      }
      console.log(data);
      logText(data);
    } else {
      console.log('error');
    }
  });
}

//function to search movie title
function movieThis() {
  var movieTitle = '';

  if (value === undefined) {
    movieTitle = 'mr+nobody';
  } else {
    movieTitle = value;
  }

  var queryUrl =
    'http://www.omdbapi.com/?t=' + movieTitle + '&y=&plot=short&apikey=' + omdb;
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var omdbData = JSON.parse(body);

      var data = {
        title: omdbData.Title,
        year: omdbData.Year,
        IMDB_rating: omdbData.imdbRating,
        Rotten_Tomatoes_rating: omdbData.Ratings[1].Value,
        country: omdbData.Country,
        language: omdbData.Language,
        plot: omdbData.Plot,
        actors: omdbData.Actors
      };
      console.log(data);
      logText(data);
    }
  });
}

//function to set command from text file
function doWhat() {
  fs.readFile('random.txt', 'utf8', function(error, data) {
    if (!error) {
      console.log(data);
      var dataArr = data.split(',');
      dataArr[0] = command;
      dataArr[1] = value;
      spotifySong();
    }
  });
}

//statement to run functions
if (command === 'my-tweets') {
  myTweets();
} else if (command === 'spotify-this-song') {
  spotifySong();
} else if (command === 'movie-this') {
  movieThis();
} else if (command === 'do-what-it-says') {
  doWhat();
} else {
  console.log('Please enter command!');
}
