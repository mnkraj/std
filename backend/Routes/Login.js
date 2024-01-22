const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const admin = require("../models/Admin");
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const student = await admin.findOne({ username });

    if (!student) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, student.password);

    if (validPassword) {
      req.session.user = { username: student.username };
      //console.log(req.session.user);
      res.json({ message: 'Login successful' });
    } else {
      //console.log('Incorrect password for user:', username);
      res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
