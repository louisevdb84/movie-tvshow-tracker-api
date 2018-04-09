const airingTodayGet = (req, res, fetch, apiKey) => {
    fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US&page=${req.body.page}`)
        .then(response => response.json())
        .then(tv => res.json(tv))
        .catch(err => res.status(400).json('Error getting Airing Today TV Shows'));    
}
module.exports = {
    airingTodayGet
}