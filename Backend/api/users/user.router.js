const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  getLastEmpID
} = require("./user.controller");


router.get("/getLastEmpID" , getLastEmpID);
router.get("/",checkToken, getUsers);
router.post("/create", createUser);
router.get("/:id",checkToken,  getUserByUserId);
router.post("/login", login);


module.exports = router;
