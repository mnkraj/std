const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../models/Student");

router.post("/auth", async (req, res) => {
  if (req.session && req.session.user) {
    return res.status(200).json({
        message: `authorized`,
      });
  }
  res.status(401).json({
    message: `Unauthorized`,
  });
});

module.exports = router;
