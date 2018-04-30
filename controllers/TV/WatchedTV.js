const handleWatchedPOST = (req, res, db) => {
    const { username, id } = req.body;
    if (!username || !id) {
      return res.status(400).json('User must be logged in');
  }

  db.insert({          
    username: username,
    tvid: id
  })
      .into('watchedtv')    
      .returning('tvid')    
        .then(user => {
            res.json(user[0]);        
  })        
  .catch(err => res.status(400).json('Unable to add to watched'))
}

const handleWatchedGET = (req, res, db, fetch, apiKey) => {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json('User must be logged in');
    }    
    
        
  db.select('tvid').from('watchedtv')
      .where('username', '=', username)        
      .then(data => {
          res.json(data);          
      })         
         .catch(err => res.status(400).json('Unable to retrieve watched'))
    
  
}

const handleWatchedDelete = (req, res, db) => {
    const { id, username } = req.body;
    if (!id||!username) {
        return res.status(400).json('Incorrect form submission');
    }
    
    db('watchedtv').where('tvid', id).andWhere('username', username)
        .del()    
            .then(entry => {
                res.json({ tvid:  id  } );
            })
            .catch(err => res.status(400).json('Unable to delete watchlist item'))    
}     

module.exports = {handleWatchedGET, handleWatchedPOST, handleWatchedDelete}