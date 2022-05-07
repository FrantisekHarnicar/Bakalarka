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

  router.post('/teacher', function (req, res){
    client.query(`Select * from zaznam_testov Where meno_ucitela='${req.body.name}' Order by id desc`, (err, respond)=>{
        res.send(respond)
        console.log(err)
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

  router.post('/teacherAddTest', function (req, res){
    const test = JSON.stringify(req.body.test)
    console.log(req.body.id)
    //const id = req.body.id
    

    if(req.body.editing){
      client.query(`Update zaznam_testov Set nazov_testu='${req.body.nazov_testu}', datum_publikacie='${req.body.datum_publikacie}', test='${test}' Where id='${req.body.id}'`, (error, respond)=>{
        if(error === null){
          res.send({
              saved: true
          })
        }
        if(error !== null){
          console.log(error)
      }
        
    })
    }else{
      client.query(`Insert into zaznam_testov(nazov_testu, meno_ucitela, datum_publikacie, test) values ('${req.body.nazov_testu}', '${req.body.meno_ucitela}', '${req.body.datum_publikacie}', '${test}')`, (error, respond)=>{
        if(error === null){
          res.send({
              saved: true
          })
        }
        if(error !== null){
          console.log(error)
      }
        
    })
  }
  })

  router.post('/testEditing', function (req, res){
    client.query(`Select * from zaznam_testov Where id='${req.body.id}'`, (error, respond)=>{
      res.send({
          testForEditing: respond
      })
      if(error !== null){
          console.log(error)
      }
  })
  })

  module.exports = router;