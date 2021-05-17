const {
  create,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  createInEmployeeLogin,
  get_Last_EmpID
} = require("./user.service");

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {

//to register user  
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      else{
        return res.status(200).json({
        success: 1,
        data: results
      });
      }
      
    });
  },

// for login
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.JWT_KEY, {          
          expiresIn: "1h"
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
          data: results
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email / password"
        });
      }
    });
  },

 //to get the user based on filter based on first name , last name & employee id 
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },

//to get the last employee id from the DB
  getLastEmpID: (req, res) => {
    
    get_Last_EmpID((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
         results.password = undefined;
        return res.json({
        success: 1,
        data: results
      });
    });
  },

//get all user data
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  
};
