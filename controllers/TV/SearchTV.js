const handleSearchPost = (req, res, fetch, apiKey) => {    
    
    fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${req.body.searchTVShows}`)
        .then(response=>response.json())       
        .then(shows => res.json(shows.results))  
        .catch(err => res.status(400).json('Error getting TV Show'));        
}


module.exports = {
    handleSearchPost
}