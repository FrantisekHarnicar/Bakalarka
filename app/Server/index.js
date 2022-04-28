  const cors = require('cors');
  const express = require('express');
  const bodyParser = require('body-parser');
  const routesHandler = require('./routes/handler');
  const cookieParser = require('cookie-parser')
  
  const app = express();
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use('/', routesHandler);
  app.use(cookieParser)
  app.use(cors({
    origin: ["http://localhpst:3000"],
    methods: ["GET", "POST"],
    credentials: true
  }));



  const PORT = 4000;
  app.listen(PORT, ()=>{
      console.log(`Server is runing on port ${PORT}.`);
  })
  