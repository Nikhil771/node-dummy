const express = require("express");
const router = express.Router();
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
    }
    const user = new User({ name, email, phone, work, password, cpassword });
    await user.save();

    res.status(201).json({ message: "User successfully register" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
