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

const handleWatchlistDelete = (req, res, db) => {
    const { id, username } = req.body;
    if (!id||!username) {
        return res.status(400).json('Incorrect form submission');
    }
    
    db('watchlist').where('movieid', id).andWhere('username', username)
        .del()    
            .then(entry => {
                res.json({ movieid:  id  } );
            })
            .catch(err => res.status(400).json('Unable to delete watchlist item'))    
}    

const handleWatchedDelete = (req, res, db) => {
    const { id, username } = req.body;
    if (!id||!username) {
        return res.status(400).json('Incorrect form submission');
    }
    
    db('watched').where('movieid', id).andWhere('username', username)
        .del()    
            .then(entry => {
                res.json({ movieid:  id  } );
            })
            .catch(err => res.status(400).json('Unable to delete watched item'))    
}    


module.exports = { handleWatchlistGET, handleWatchlistPOST, handleWatchlistDelete, handleWatchedDelete }