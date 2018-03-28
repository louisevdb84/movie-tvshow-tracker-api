const handleWatchlistPOST = (req, res, db) => {
    const { username, id } = req.body;
    if (!username || !id) {
      return res.status(400).json('User must be logged in');
  }

  db.insert({          
    username: username,
    movieid: id
  })
      .into('watchlist')    
      .returning('movieid')    
        .then(user => {
            res.json(user[0]);        
  })        
  .catch(err => res.status(400).json('Unable to add to watchlist'))
}

const handleWatchlistGET = (req, res, db, fetch, apiKey) => {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json('User must be logged in');
    }    
    
        
  db.select('movieid').from('watchlist')
      .where('username', '=', username)        
      .then(data => {
          res.json(data);          
      })         
         .catch(err => res.status(400).json('Unable to retrieve watchlist'))
    
  
}

module.exports = {handleWatchlistGET, handleWatchlistPOST}