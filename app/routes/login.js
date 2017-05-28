const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('login');
})


router.post('/login', (req, res) => {
  res.send('Testing');
})

module.exports = router;