const detailsGet = (req, res, fetch, apiKey) => {
    fetch(`https://api.themoviedb.org/3/tv/${req.body.id}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(tv => res.json(tv))
        .catch(err => res.status(400).json('Error getting TV Show Details'));    
}
module.exports = {
    detailsGet
}