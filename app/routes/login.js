const router = require('express').Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../database/models/user')



router.get('/login', (req, res) => {
  res.render('login');
})


router.post('/login', (req, res) => {
   UserModel.findOne({username: req.body.username}, (err, user) =>{
    if(user === null){
      res.send({
        error: "Invalid User"
      })
    } else {
      bcrypt.compare(req.body.password, user.password, function(err, _resPass) {
        if(_resPass){
          res.send({
            redirect: './user/'+req.body.username          
          })
        }else {
          res.send({
          error: 'Invalid password'
        })
        }        
      });
    }
  })
})

module.exports = router;