const dotenv = require('dotenv').config();
const mongoose = require('mongoose').connect(process.env.DB);
const db = mongoose.connection;

db.on('connected', ()=> {
  console.log("Connected to DB");
}).on('error', ()=>{
  throw ("Couldn't connect to database");  
}).on('disconnected', ()=>{
  console.log("Disconnected from DB");
})

module.exports = db;