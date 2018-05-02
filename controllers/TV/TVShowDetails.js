const detailsGet = (req, res, fetch, apiKey) => {
    fetch(`https://api.themoviedb.org/3/tv/${req.body.id}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(tv => res.json(tv))
        .catch(err => res.status(400).json('Error getting TV Show Details'));    
}

const getCast = (req, res, fetch, apiKey) => {
    fetch(`https://api.themoviedb.org/3/tv/${req.body.id}/credits?api_key=${apiKey}`)
        .then(response => response.json())
        .then(movies => res.json(movies))
        .catch(err => res.status(400).json('Error getting movie by id'));    
}

const getTrailers = (req, res, fetch, apiKey) => {
    fetch(`https://api.themoviedb.org/3/tv/${req.body.id}/videos?api_key=${apiKey}`)
        .then(response => response.json())
        .then(movies => res.json(movies))
        .catch(err => res.status(400).json('Error getting movie by id'));    
}

module.exports = {
    detailsGet,
    getCast,
    getTrailers
}