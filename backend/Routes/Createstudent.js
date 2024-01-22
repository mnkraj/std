const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const { body, validationResult } = require("express-validator");
router.post(
  "/createstudent",
  [body("email", "Enter Valid Email").isEmail()],
  async (req, res) => {
    let { name, RegistrationNo, email, Course, CurrentSem, Batch } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    RegistrationNo = RegistrationNo.toUpperCase()
    const existingStudent = await Student.findOne({ RegistrationNo });
    if (existingStudent) {
      return res.status(409).json({ error: "Student with this RegistrationNo already exists" });
    }

    try {
      await Student.create({
        name: name,
        email: email,
        RegistrationNo: RegistrationNo,
        Course: Course,
        CurrentSem: CurrentSem,
        Batch: Batch,
      });
      res.json({ success: true });
    } catch (e) {
      console.error("Error creating student:", e);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

module.exports = router;
