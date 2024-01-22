const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/Student'); 

router.post('/search', async (req, res) => {
  let {RegistrationNo} = req.body;
  RegistrationNo = RegistrationNo.toUpperCase()
  try {
    const student = await Student.findOne({ RegistrationNo: RegistrationNo });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
