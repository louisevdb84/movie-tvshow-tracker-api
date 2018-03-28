const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const fetch = require('node-fetch');
const home = require('./controllers/home');
const login = require('./controllers/login');
const register = require('./controllers/register');
const watchlist = require('./controllers/watchlist');
const watched = require('./controllers/watched');

const app = express();
const apiKey = "871feeb0aba09430c9465b40bcb07317";
// const apiKey = process.env.apiKey;

app.use(cors())
app.use(bodyParser.json());

const db = knex({
    client: 'pg',
    connection: {
        // connectionString: process.env.DATABASE_URL,
        connectionString: "postgres://kdnxhxxieuhxxx:a71206b430f5251cc21a952acbd57b25d413887463cf3fac6505991823188689@ec2-23-21-121-220.compute-1.amazonaws.com:5432/d1ch8ubjutkpio",
        ssl: true,
    }
});

app.get('/', (req, res) => { res.send('It is working!') });
app.post('/login', login.handleLogin(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/upcomingMovies', (req, res) => { home.handleUpcomingMoviesGet(req, res, fetch, apiKey) });
app.get('/topRated', (req, res) => { home.handleTopRatedGet(req, res, fetch, apiKey) });
app.get('/popular', (req, res) => { home.handlePopularGet(req, res, fetch, apiKey) });
app.get('/nowPlaying', (req, res) => { home.handleNowPlayingGet(req, res, fetch, apiKey) });
app.post('/search', (req, res) => { home.handleSearchPost(req, res, fetch, apiKey) });
app.get('/genres', (req, res) => { home.handleGenreGet(req, res, fetch, apiKey) });
app.post('/genres', (req, res) => { home.handleGenreGet(req, res, fetch, apiKey) });

app.post('/id', (req, res) => { home.handleIdGet(req, res, fetch, apiKey) });
app.post('/addwatchlist', (req, res) => { watchlist.handleWatchlistPOST(req, res, db) });
app.post('/watchlist', (req, res) => { watchlist.handleWatchlistGET(req, res, db, fetch, apiKey) });
app.post('/addwatched', (req, res) => { watched.handleWatchedPOST(req, res, db) });
app.post('/watched', (req, res) => { watched.handleWatchedGET(req, res, db, fetch, apiKey) });

app.listen(process.env.PORT || 3001, () => console.log('App is running on port 3001'))


