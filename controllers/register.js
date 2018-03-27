const handleRegister = (req, res, db, bcrypt) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json('Username and Password are required');
    }    
  const hash = bcrypt.hashSync(password);
  
      
        db.insert({          
          hash: hash,
          username: username
        })
            .into('users')    
        .returning('username')    
        .then(user => {
              res.json(user[0]);        
        })        
        .catch(err => res.status(400).json('Unable to register'))
      }
      
  module.exports = {
    handleRegister: handleRegister
  };
