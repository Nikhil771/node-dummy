const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
require("../db/connection");

router.get("/", (req, res) => {
  res.send("Welcome to home page from router");
});

// router.post("/signup", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;
//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "all fields are required" });
//   }
//   User.findOne({ email: email })
//     .then((userExit) => {
//       if (userExit) {
//         return res.status(422).json({ error: "User already exist" });
//       }

//       const user = new User({ name, email, phone, work, password, cpassword });
//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "User successfully register" });
//         })
//         .catch((err) => res.status(500).json({ error: "Faild to register" }));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

router.post("/signup", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "all fields are required" });
  }
  try {
    const userExit = await User.findOne({ email: email });
    if (userExit) {
      return res.status(422).json({ error: "User already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password not mached" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      await user.save();
      res.status(201).json({ message: "User successfully register" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill the data" });
    }
    const userLogin = await User.findOne({ email: email });
    // console.log("UserData", userLogin);
    if(userLogin){
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();
      console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true
      });
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials pass" });
      } else {
        res.json({ Message: "User signIn successfully" });
      }
    }else{
      res.status(400).json({ error: "Invalid Credentials" });
    }
   
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
