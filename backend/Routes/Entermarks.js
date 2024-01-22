const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.post("/marks", async (req, res) => {
  try {
    let { RegistrationNo, marks } = req.body;
    RegistrationNo = RegistrationNo.toUpperCase();
    const student = await Student.findOne({ RegistrationNo: RegistrationNo });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    marks.forEach((updatedMark) => {
      let { subjectcode, marksObtained } = updatedMark;
      subjectcode = subjectcode.toUpperCase();
      const existingSubject = student.marks.find(
        (mark) => mark.subjectcode === subjectcode
      );

      if (existingSubject) {
        existingSubject.marksObtained = marksObtained;
      } else {
        throw new Error("Subject not found");
      }
    });

    await student.save();

    res
      .status(200)
      .json({ success: true, message: "Marks updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
