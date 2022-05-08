const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
//const saltRounds = 10;

const session = require('express-session')




  router.use(session(
      {
      key: "userId",
      secret: "subscribe",
      resave:  false,
      saveUninitialized: false,
      cookie: {
          expires: 60*60*1000,
      }
  }))

let dbPassword = [];
let user = [];

const {Client} = require('pg')

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "Geforce820",
    port: 5432
  });
  client.connect();

  router.delete("/teacher", (req, res) => {
    if(req.session.user) {
      req.session.destroy((err) => {
        res.send(err);
      });
    }
  })

 router.get("/teacherlogin",(req, res)=>{
     if(req.session.user){
         res.send({loggedIn: true, user: req.session.user});
     }else{
         res.send({loggedIn: false})
     }
 })



router.post('/teacherlogin', function (req, respond) {
    user = JSON.parse(JSON.stringify(req.body))
    // Pripadny insert prihlasovacich udajov
    /*bcrypt.hash('heslo', saltRounds, (err, hash)=>{
        client.query("Insert Into prihlasenie (ID, meno, heslo) Values (4,'FrantisekHarnicar','"+hash+"')",
        (err, result)=>{
            console.log(hash)
            console.log(err)
        })
        client.end;
    })*/


    client.query("Select * from Prihlasenie Where meno='" +user.username+"'", (err, res)=>{
        
        if(!err){
            
            
                if(res.rowCount > 0){
                    dbPassword = res.rows[0].heslo;
                    bcrypt.compare(user.password,dbPassword, (err, hash)=>{

                    if(hash){
                        console.log("Login success")
                        req.session.user = res;
                        respond.send({loggedIn:true, name: req.session.user})
                    }else{
                        console.log("Wrong password")
                        respond.send({loggedIn:false})
                    }
                })
                }else{
                    console.log('Wrong name')
                    respond.send({loggedIn:false})
                }
            

        }else{
            console.log(err.message);
        }
        client.end;
    })
  })


module.exports = router;