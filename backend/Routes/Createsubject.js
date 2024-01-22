
const express = require("express");
const router = express.Router();
const Student = require("../models/Student");


router.post("/newsubject", async (req, res) => {
  try {
    let { subject, marksObtained,subjectcode } = req.body;
    if (!marksObtained) marksObtained = 0;
    subjectcode = subjectcode.toUpperCase()
    const filter = {};

    
    const update = {
      $push: {
        marks: { subject, marksObtained ,subjectcode },
      },
    };

    
    const result = await Student.updateMany(filter, update);

    res.status(200).json({
      success: true,
      message: `Added subject '${subject}' to all students. Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s)`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
