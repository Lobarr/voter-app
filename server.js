const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const helmet = require('helmet')
const path = require('path')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const db = require('./app/database/connection')
const passport = require('passport');

//port initializer 
const port = process.env.PORT || 3000

//view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//static files
app.use('/public', express.static(path.join(__dirname, 'public')));

//middlewares 
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(session({
  secret: 'pollerAppSecret',
  resave: true,
  saveUninitialized: true,
  cookie: {secure: true}
}))
app.use(passport.initialize())
app.use(passport.session())

//routes
app.use(require('./app/routes/index'))
app.use(require('./app/routes/signup'))
app.use(require('./app/routes/login'))
app.use(require('./app/routes/user'))


app.listen(port, ()=>{
  console.log(`Server running on port ${port}...`)
})