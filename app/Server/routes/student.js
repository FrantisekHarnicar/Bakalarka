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
        if(err !== null){
            console.log(err)
        }
    })
  })
  router.post('/studentSaveTest', function (req, res){
    const studentTest = JSON.stringify(req.body.json)

    client.query(`Insert into hodnotenie_studenta(nazov_testu, meno_studenta, pocet_spravnych_odpovedi, datum_odovzdania, cas_riesenia, test) Values ('${req.body.testName}', '${req.body.studentName}', '${req.body.rightAnswer}', '${req.body.date}', '${req.body.time}', '${studentTest}') `, 
    (err)=>{
        if(err === null){
            client.query(`Select * from hodnotenie_studenta Where nazov_testu='${req.body.testName}' Order by pocet_spravnych_odpovedi desc`, (error, respond)=>{
                res.send({
                    saved: true,
                    allSolution: respond
                })
                if(error !== null){
                    console.log(error)
                }
            })
            
        }else{
            console.log(err)
        }
    })
  })
  


  module.exports = router;