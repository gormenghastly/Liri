# Liri

Liri is like iPhone's Siri but uses text instead of speech. LIRI is a command line node app that takes in parameters and returns data based on one of four commands:

\*my-tweets

\*spotify-this-song

\*movie-this

\*do-what-it-says

Liri also logs all of the returned data into a text file.

## What Each Command Does

#### 1.node liri.js my-tweets

Displays my last 20 tweets and when they were created in terminal/bash window.

#### 2.node liri.js spotify-this-song '<song name>'


Shows the following information about the song in terminal/bash window.

  *Artist(s)
  *The song's name
  *A preview link of the song from Spotify
  *The album that the song is from
  *Or if no song is passed through, it will default to "The Sign" by Ace of Base

#### 3.node liri.js movie-this ''<movie name>'


Shows the following information in terminal/bash.

  *Title of the movie.
  *Year the movie came out.
  *IMDB Rating of the movie.
  *Rotten Tomatoes Rating.
  *Country where the movie was produced.
  *Language of the movie.
  *Plot of the movie.
  *Actors in the movie.

Or if no movie is passed through, it will default to "Mr. Nobody"

#### 4.node liri.js do-what-it-says

Takes the text from random.txt and runs the song through spotify-this-song command

## Technologies Utilized

  *Node.js
  *Twitter npm
  *Node-Spotify-API npm
  *Request npm
  *FS npm
  *OMDB API

## Screenshots

![alt text](https://github.com/gormenghastly/Liri/images/Liri-1.png)

![alt text](https://github.com/gormenghastly/Liri/images/Liri-2.png)

![alt text](https://github.com/gormenghastly/Liri/images/Liri-3.png)

![alt text](https://github.com/gormenghastly/Liri/images/Liri-4.png)
