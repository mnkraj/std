const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

router.post("/students", async (req, res) => {
    try {
        const data = await mongoose.connection.db.collection("students").find({}).toArray();
        global.studentsdata = data;
        res.send(global.studentsdata);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;