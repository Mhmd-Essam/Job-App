const express = require("express");
const { register,Login,logout,getUser} = require("./../controllers/UserController");
const {isAuthorized}=require("./../middlewares/auth")
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(Login); 
router.route('/logout').get(isAuthorized,logout)
router.route('/getuser').get(isAuthorized,getUser)

module.exports = router;
