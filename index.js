//index.js 
const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const farmerRoutes = require('./routes/farmerRoutes')
const cors = require('cors');
const farmRoutes =require('./routes/farmRoutes');
const productRoutes=require('./routes/productRoutes');
const path=require('path');


dotEnv.config()
const PORT = process.env.PORT
const URL = process.env.URL
const app = express()

// Connecting to MongoDB
mongoose.connect(URL)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  app.use(cors());
  app.use(bodyParser.json());
  app.use('/farmer',farmerRoutes);
  app.use('/farm',farmRoutes);
  app.use('/product',productRoutes);
  app.use('/uploads',express.static('uploads'));

app.get('/',(req,res)=>{
  res.send("hey baby")
})

app.listen(PORT , ()=>{
    console.log(`The server has started running at http://localhost:${PORT} `)
})

