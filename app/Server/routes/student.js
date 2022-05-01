const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
//const saltRounds = 10;


const {Client} = require('pg')

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "Geforce820",
    port: 5432
  });
  client.connect();

  router.get('/student', function (req, res){
    client.query("Select * from zaznam_testov ", (err, respond)=>{
        res.send(respond)
    })

  })
  router.post('/studentTest', function (req, res){
    client.query("Select * from zaznam_testov Where id='"+req.body.testID+"'", (err, respond)=>{
        res.send(respond)
        console.log(err)
    })

  })
  


  module.exports = router;