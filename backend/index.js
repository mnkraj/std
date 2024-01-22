const express = require("express");
const cors = require("cors");
const search = require("./Routes/Searchstudent");
const app = express();
const port = 4000;
const mongodb = require("./db");
const createuser = require("./Routes/Createstudent");
const createsubject = require("./Routes/Createsubject");
const marks = require("./Routes/Entermarks");
const studentsdata = require("./Routes/Displaystudent");
const Signup = require ("./Routes/Signup")
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const Login = require('./Routes/Login')
const authentication = require("./Middlewares/Authentication")
const auth = require("./Routes/auth")
mongodb();

app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);



app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use("/api/", Signup);
app.use("/api/", Login);
app.use("/api/", auth);
app.use("/api/",authentication, createuser);
app.use("/api/",authentication, createsubject);
app.use("/api/",authentication, marks);
app.use("/api/",authentication, studentsdata);
app.use("/api/",authentication, search);

app.listen(port, () => {
  console.log(`SERVER STARTED AT PORT ${port}`);
});
