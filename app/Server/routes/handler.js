const express = require('express');
const router = express.Router();

const {Client} = require('pg')
let db = [];
const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "Geforce820",
    port: 5432
  });

  client.connect();

  client.query('Select * from Prihlasenie', (err, res)=>{
      if(!err){
        db = res.rows;
        console.log(res.rows)
        
      }else{
          console.log(err.message);
      }
      client.end;
  })

router.get('/tweets', async (req, res) => {
    /*const str = [{
        "name": "asd ad",
        "msg": "dasdasd d asd asd",
        "username": "dsa sddddd"
    }];*/
    res.end(JSON.stringify(db));
});

module.exports = router;



