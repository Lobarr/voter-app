module.exports = (req, res, next) => {
  if(req.isAuthenticated())
  {
    return next();
  }else {
    req.flash('danger', 'Please login here')
    res.redirect('/login');
  }   
}