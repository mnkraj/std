const mongoose = require('mongoose')


const loaddata = async ()=>{
    global.studentsdata = await mongoose.connection.db.collection("students").find({}).toArray();
}

module.exports = loaddata