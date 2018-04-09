const onTheAirGet = (req, res, fetch, apiKey) => {
    fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=en-US&page=${req.body.page}`)
        .then(response => response.json())
        .then(tv => res.json(tv))
        .catch(err => res.status(400).json('Error getting On The Air TV Shows'));    
}
module.exports = {
    onTheAirGet
}