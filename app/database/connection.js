const mongoose = require('mongoose').connect('mongodb://localhost/voter-app');
const db = mongoose.connection;

db.on('connected', ()=> {
  console.log("Connected to DB");
}).on('error', ()=>{
  console.log("Couldn't connect to database");
}).on('disconnected', ()=>{
  console.log("Disconnected from DB");
})

module.exports = db;