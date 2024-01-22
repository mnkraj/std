const mongoose = require("mongoose")
const {Schema} = mongoose;
const StudentSchema = new Schema({
    name:{
        type : String,
        required : true
    },
    RegistrationNo:{
        type : String,
        required : true,
        unique: true,
    },
    email:{
        type : String,
        required : true
    },
    Course:{
        type : String,
        required : true
    },
    CurrentSem:{
        type : Number,
        required : true
    },
    Batch:{
        type : Number,
        required : true
    },
    date:{
        type : Date,
        default : Date.now
    },
    marks: [
        {
          subject: {
            type: String,
            required: true,
          },
          subjectcode: {
            type: String,
            required: true,
          },
          marksObtained: {
            type: Number,
          },
        },
      ],
})
module.exports = mongoose.model("student",StudentSchema);