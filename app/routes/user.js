const router = require('express').Router();

router.get('/user/:username', (req, res) => {
  res.render('user', {
    username: req.params.username
  });
});

module.exports = router;

