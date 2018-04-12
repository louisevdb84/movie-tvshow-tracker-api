const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const fetch = require('node-fetch');

const login = require('./controllers/login');
const register = require('./controllers/register');


const app = express();

const apiKey = process.env.MovieDbApiKey;

app.use(cors())
app.use(bodyParser.json());

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.MovieDbDatabaseURL,        
        ssl: true,
    }
});

//#region MOVIES
const home = require('./controllers/Movies/home');
const watchlist = require('./controllers/Movies/watchlist');
const dislike = require('./controllers/Movies/dislike');
const watched = require('./controllers/Movies/watched');

app.get('/', (req, res) => { res.send('It is working!') });
app.post('/login', login.handleLogin(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.post('/upcomingMovies', (req, res) => { home.handleUpcomingMoviesGet(req, res, fetch, apiKey) });
app.get('/countUpcoming', (req, res) => { home.upcomingPageCount(req, res, fetch, apiKey) });

app.post('/topRated', (req, res) => { home.handleTopRatedGet(req, res, fetch, apiKey) });
app.get('/countTopRated', (req, res) => { home.topRatedPageCount(req, res, fetch, apiKey) });

app.post('/popular', (req, res) => { home.handlePopularGet(req, res, fetch, apiKey) });
app.get('/countPopular', (req, res) => { home.popularPageCount(req, res, fetch, apiKey) });

app.post('/nowPlaying', (req, res) => { home.handleNowPlayingGet(req, res, fetch, apiKey) });
app.get('/countNowPlaying', (req, res) => { home.nowPlayingPageCount(req, res, fetch, apiKey) });

app.post('/search', (req, res) => { home.handleSearchPost(req, res, fetch, apiKey) });
app.get('/genres', (req, res) => { home.handleGenreGet(req, res, fetch, apiKey) });
app.post('/genres', (req, res) => { home.handleGenreGet(req, res, fetch, apiKey) });
app.post('/cast', (req, res) => { home.getCast(req, res, fetch, apiKey) });
app.post('/trailers', (req, res) => { home.getTrailers(req, res, fetch, apiKey) });

app.post('/id', (req, res) => { home.handleIdGet(req, res, fetch, apiKey) });

app.post('/addwatchlist', (req, res) => { watchlist.handleWatchlistPOST(req, res, db) });
app.post('/deletewatchlist', (req, res) => { watchlist.handleWatchlistDelete(req, res, db) });
app.post('/deletewatched', (req, res) => { watchlist.handleWatchedDelete(req, res, db) });
app.post('/watchlist', (req, res) => { watchlist.handleWatchlistGET(req, res, db, fetch, apiKey) });

app.post('/addDislike', (req, res) => { dislike.handleDislikePOST(req, res, db) });
app.post('/deleteDislike', (req, res) => { dislike.handleDislikeDelete(req, res, db) });
app.post('/dislike', (req, res) => { dislike.handleDislikeGET(req, res, db, fetch, apiKey) });

app.post('/addwatched', (req, res) => { watched.handleWatchedPOST(req, res, db) });
app.post('/watched', (req, res) => { watched.handleWatchedGET(req, res, db, fetch, apiKey) });

//#endregion

//#region TV

const popularTV = require('./controllers/TV/PopularTV');
const topRatedTV = require('./controllers/TV/TopRatedTV');
const onTheAirTV = require('./controllers/TV/OnTheAirTV');
const airingTodayTV = require('./controllers/TV/AiringTodayTV');
const TVShowDetails = require('./controllers/TV/TVShowDetails');
const watchlistTV = require('./controllers/TV/WatchlistTV');

app.post('/popularTV', (req, res) => { popularTV.popularGet(req, res, fetch, apiKey) });
app.post('/topRatedTV', (req, res) => { topRatedTV.topRatedGet(req, res, fetch, apiKey) });
app.post('/onTheAirTV', (req, res) => { onTheAirTV.onTheAirGet(req, res, fetch, apiKey) });
app.post('/airingTodayTV', (req, res) => { airingTodayTV.airingTodayGet(req, res, fetch, apiKey) });

app.post('/detailsTV', (req, res) => { TVShowDetails.detailsGet(req, res, fetch, apiKey) });

app.post('/addwatchlistTV', (req, res) => { watchlistTV.handleWatchlistPOST(req, res, db) });
app.post('/deletewatchlistTV', (req, res) => { watchlistTV.handleWatchlistDelete(req, res, db) });
app.post('/watchlistTV', (req, res) => { watchlistTV.handleWatchlistGET(req, res, db, fetch, apiKey) });

app.post('/seasonupdate', (req, res) => { watchlistTV.seasonUpdate(req, res, db, fetch, apiKey) });


//#endregion

app.listen(process.env.PORT || 3001, () => console.log('App is running on port 3001'))