const express = require("express");
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');
//mongodb connection
const dbURI = 'mongodb+srv://bharatyadav0407:ond2UT89dpVz2K5e@node-tut.dumhl.mongodb.net/exercise?retryWrites=true&w=majority';
mongoose.connect(dbURI,
  {
    useUnifiedTopology:true
  }).then(
  ()=>{
    console.log("Database connected");
  }
);

env.config();
app.use(express.json());

 app.get('/',(req,res)=>{
      res.status(200).json({
        message:"Hello from Server Side"
      });
 });
 app.post('/data',(req,res,next)=>{
    res.status(200).json({
      message:req.body
    });
});
 app.listen(3000,() => {
    console.log(`server is running on port:3000`);
});