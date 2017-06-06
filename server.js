const express = require('express')
const app = express()
const path = require('path')
const dotenv = require('dotenv').config()
const db = require('./app/database/connection')
const middlewares = require('./helpers/middlewares')


//port initializer 
const port = process.env.PORT || 3000

//view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//static files
app.use('/public', express.static(path.join(__dirname, 'public')));

//middlewares 
middlewares(app);

//routes
app.use(require('./app/routes/index'))
app.use(require('./app/routes/signup'))
app.use(require('./app/routes/login'))
app.use(require('./app/routes/logout'))
app.use(require('./app/routes/profile'))
app.use(require('./app/routes/newpoll'))
app.use(require('./app//routes/editpoll'))
app.use(require('./app/routes/viewpoll'))
app.use(require('./app/routes//deletepoll'))
app.use(require('./app/routes/vote'))
app.use(require('./app/routes/api'))

app.listen(port, ()=>{
  console.log(`Server running on port ${port}...`)
})