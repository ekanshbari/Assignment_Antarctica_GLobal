const pool = require("../../config/database");

module.exports = {

  //to register user  
  create: (data, callBack) => {
    pool.query(
      `insert into user_details(emp_id,f_name, l_name,email_id, organisation_name, password) 
                values(?,?,?,?,?,?)`,
      [
        data.emp_id,
        data.f_name,
        data.l_name,
        data.email_id,
        data.organisation_name,
        data.password        
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        pool.query(
      `insert into employee_login(id, username, password) 
                values(?,?,?)`,
      [
        data.id,
        data.email_id,
        data.password        
      ],
      
    );
        return callBack(null, results);
      }
    );
  },

 //validating login with finding all data of user based on username which is email id 
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from employee_login where username = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  //to get the user based on filter based on first name , last name & employee id 
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select id,emp_id,f_name, l_name,email_id, organisation_name from user_details where f_name = ? or l_name=? or email_id = ? or emp_id =?  and roles = ?`,
      [id, id, id, id, "employee"],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

// to get the last employee id from the DB
  get_Last_EmpID: callBack => {
    console.log("in service");
    pool.query(
      `select * from user_details where roles = ? ORDER BY id DESC LIMIT 1`,
      ["employee"],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  },

  getUsers: callBack => {
    pool.query(
      `select id,emp_id,f_name, l_name,email_id, organisation_name  from user_details where roles = ?`,
      ["employee"],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  

};
