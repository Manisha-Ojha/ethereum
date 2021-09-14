const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const hash = require('object-hash');
const router = require('./router/router.js');
const objectHash = require('object-hash');

const app = express();

const port = 8080;

//mongodb connection
const URL = 'mongodb://localhost:27017/coin';

mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,},
     (err) =>{
      if(!err){
          console.log("successful conction with database");
      }else{
          console.log("Error in database conection");
      }  
    });

//server connection
app.listen(port,() =>{
    console.log(`app is runnig at http://localhost:${port}`)
});

app.use('/',router)