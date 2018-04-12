const handleWatchlistPOST = (req, res, db) => {
    const { username, id, season } = req.body;
    if (!username || !id) {
      return res.status(400).json('User must be logged in');
  }

  db.insert({          
    username: username,
    tvid: id,
    season: season
  })
      .into('watchlisttv')    
      .returning('tvid')    
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
    
        
  db.select('tvid', 'season').from('watchlisttv')
      .where('username', '=', username)        
      .then(data => {
          res.json(data);          
      })         
         .catch(err => res.status(400).json('Unable to retrieve watchlist'))
    
  
}

const handleWatchlistDelete = (req, res, db) => {
    const { id, username } = req.body;
    if (!id||!username) {
        return res.status(400).json('Incorrect form submission');
    }
    
    db('watchlisttv').where('tvid', id).andWhere('username', username)
        .del()    
            .then(entry => {
                res.json({ tvid:  id  } );
            })
            .catch(err => res.status(400).json('Unable to delete watchlist item'))    
}   




module.exports = { handleWatchlistGET, handleWatchlistPOST, handleWatchlistDelete }