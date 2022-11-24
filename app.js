const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const reqFilter = require("./middelware");
const e = require("express");
const app = express();
const route = express.Router();

dotenv.config({ path: "./config.env" });
require("./db/connection");

const PORT = process.env.PORT;

route.use(reqFilter);

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

app.get("/users", (req, res) => {
  res.send("Welcome to users page");
});

route.get("/about", (req, res) => {
  res.send("Welcome to about page");
});

route.get("/contact", (req, res) => {
  res.send("Welcome to contact page");
});

app.use("/", route);

// dirPath = path.join(__dirname, 'files');
// filePath = `${dirPath}/doc2.txt`;

// fs.writeFileSync(filePath, 'This is dummy text');

// fs.readFile(filePath, 'utf8', (err,item)=> {
//     console.log(err);
// });

// fs.appendFile(filePath, ' and file name is doc1.txt',(err)=>{
// if(!err)
// console.log('File successfully updated');
// });

// fs.rename(filePath,`${dirPath}/doc2.txt`, (err)=>{
// if(!err)
// console.log('fileName is updated');
// });

// fs.unlinkSync(`${dirPath}/doc2.txt`);

// console.log('I m first');

// setTimeout(()=>{
// console.log('I m under setTimeout')
// },3000);

// console.log('I m last');

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
