const express = require("express");
const router = express.Router();
const User = require("../models/Admin");
const bcrypt = require('bcrypt')
router.post(
  "/signup",
  async (req, res) => {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(14);
    const secpwd = await bcrypt.hash(password,salt);
    try {
      User.create({
        username: username,
        password: secpwd
      });
      res.json({success : true})
    } catch (e) {
        res.json({success : false})
    }
  }
);

module.exports = router;
