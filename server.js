const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const fetch = require('node-fetch');
const home = require('./controllers/home');

const app = express();
const apiKey = "871feeb0aba09430c9465b40bcb07317";

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => { console.log("This is working") });
app.get('/upcomingMovies', (req, res) => { home.handleUpcomingMoviesGet(req, res, fetch, apiKey) });
app.get('/topRated', (req, res) => { home.handleTopRatedGet(req, res, fetch, apiKey) });
app.get('/popular', (req, res) => { home.handlePopularGet(req, res, fetch, apiKey) });
app.get('/nowPlaying', (req, res) => { home.handleNowPlayingGet(req, res, fetch, apiKey) });
app.post('/search', (req, res) => { home.handleSearchPost(req, res, fetch, apiKey) });
app.get('/genres', (req, res) => { home.handleGenreGet(req, res, fetch, apiKey) });

app.listen(process.env.PORT || 3001, () => console.log('App is running on port 3001'))


