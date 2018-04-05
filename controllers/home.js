const handleUpcomingMoviesGet = (req, res, fetch, apiKey) => {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${req.body.page}`)
        .then(response => response.json())
        .then(movies => res.json(movies.results))
        .catch(err => res.status(400).json('Error getting upcoming movies'));    
}

const upcomingPageCount = (req, res, fetch, apiKey) => {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US`)
        .then(response => response.json())
        .then(movies => res.json(movies.total_pages))
        .catch(err => res.status(400).json('Error getting upcoming movies'));    
}

const handleTopRatedGet = (req, res, fetch, apiKey) => {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${req.body.page}`)
        .then(response=>response.json())       
        .then(movies => res.json(movies.results))  
        .catch(err => res.status(400).json('Error getting top rated movies'));        
}

const topRatedPageCount = (req, res, fetch, apiKey) => {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`)
        .then(response=>response.json())       
        .then(movies => res.json(movies.total_pages))
        .catch(err => res.status(400).json('Error getting top rated movies'));        
}

const handlePopularGet = (req, res, fetch, apiKey) => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${req.body.page}`)
        .then(response=>response.json())       
        .then(movies => res.json(movies.results))  
        .catch(err => res.status(400).json('Error getting popular movies'));        
}

const popularPageCount = (req, res, fetch, apiKey) => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`)
        .then(response=>response.json())       
        .then(movies => res.json(movies.total_pages))
        .catch(err => res.status(400).json('Error getting popular movies'));        
}

const handleNowPlayingGet = (req, res, fetch, apiKey) => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${req.body.page}`)
        .then(response=>response.json())       
        .then(movies => res.json(movies.results))  
        .catch(err => res.status(400).json('Error getting now playing movies'));        
}

const nowPlayingPageCount = (req, res, fetch, apiKey) => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US`)
        .then(response=>response.json())       
        .then(movies => res.json(movies.total_pages))
        .catch(err => res.status(400).json('Error getting now playing movies'));        
}


// ********************************************************************************************************************

const handleSearchPost = (req, res, fetch, apiKey) => {    
    
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${req.body.searchMovies}`)
        .then(response=>response.json())       
        .then(movies => res.json(movies.results))  
        .catch(err => res.status(400).json('Error getting now playing movies'));        
}

const handleGenreGet = (req, res, fetch, apiKey) => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
        .then(response=>response.json())       
        .then(movies => res.json(movies))  
        .catch(err => res.status(400).json('Error getting now playing movies'));        
}

const handleIdGet = (req, res, fetch, apiKey) => {
    fetch(`https://api.themoviedb.org/3/movie/${req.body.id}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(movies => res.json(movies))
        .catch(err => res.status(400).json('Error getting movie by id'));    
}

const getCast = (req, res, fetch, apiKey) => {
    fetch(`https://api.themoviedb.org/3/movie/${req.body.id}/casts?api_key=${apiKey}`)
        .then(response => response.json())
        .then(movies => res.json(movies))
        .catch(err => res.status(400).json('Error getting movie by id'));    
}

const getTrailers = (req, res, fetch, apiKey) => {
    fetch(`https://api.themoviedb.org/3/movie/${req.body.id}/videos?api_key=${apiKey}`)
        .then(response => response.json())
        .then(movies => res.json(movies))
        .catch(err => res.status(400).json('Error getting movie by id'));    
}



module.exports = {
    handleUpcomingMoviesGet,
    handleTopRatedGet,
    handlePopularGet,
    handleNowPlayingGet,
    handleSearchPost,
    handleGenreGet,
    handleIdGet,
    upcomingPageCount,
    topRatedPageCount,
    popularPageCount,
    nowPlayingPageCount,
    getCast,
    getTrailers
    
}