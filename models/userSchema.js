const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { String, reuired: true },
  email: { String, reuired: true },
  phone: { Number, reuired: true },
  work: { String, reuired: true },
  password: { String, reuired: true },
  cpassword: { String, reuired: true },
});

const User = mongoose.model('USER', userSchema);
module.exports = User;