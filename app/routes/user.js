const router = require('express').Router();

router.get('/user/:username', (req, res) => {
  res.render('user');
});

module.exports = router;