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
  console.log("skuska")

  router.get('/teacher', function (req, res){
    client.query("Select * from zaznam_testov ", (err, respond)=>{
        res.send(respond)
    })

  })
  router.post('/teacherdelete', function (req, res){
      console.log(req.body.id)
    client.query("DELETE FROM zaznam_testov WHERE id='"+req.body.id+"' ", (err, respond)=>{
        res.send(true)
        console.log(err)
    })

  })
  router.post('/studentRating', function (req, res){
    client.query(`Select * from hodnotenie_studenta Where nazov_testu='${req.body.id}' Order by pocet_spravnych_odpovedi desc`, (error, respond)=>{
      res.send({
          allRating: respond
      })
      if(error !== null){
          console.log(error)
      }
  })
  })

  router.post('/searchPic', function (req, res){
    client.query(`Select * from zoznam_piktogramov Where nazov_piktogramu LIKE '%${req.body.input}%'`, (error, respond)=>{
      res.send({
          allImages: respond
      })
      if(error !== null){
          console.log(error)
      }
  })
  })

  module.exports = router;