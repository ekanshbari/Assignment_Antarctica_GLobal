require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");

var cors = require('cors');
app.use(cors());
app.options('*',cors());


//Cors
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.json());

app.use("/api/users", userRouter);
const port = process.env.port;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
   