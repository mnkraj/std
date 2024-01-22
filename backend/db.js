const mongoose = require("mongoose");
//const loaddata = require("./Routes/Loaddata")
require('dotenv').config()
console.log(process.env) 
const uri =
  process.env.MONGO_URI;

const mongodb = async () => {
  try {
    await mongoose.connect(uri);
    console.log("DATABASE CONNECTED");
    
    //global.studentsdata = await mongoose.connection.db.collection("students").find({}).toArray();
    
  } catch (error) {
    console.log("ERROR", error);
  }
};

module.exports = mongodb;
