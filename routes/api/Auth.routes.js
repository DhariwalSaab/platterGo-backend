const router = require("express").Router();
const getuser = require("../../controller/auth/getUser");
const register = require("../../controller/auth/register");
const login = require("../../controller/auth/login");
const nodemailer = require("../../controller/auth/nodemailer");
const getUsernameMiddleware = require("../../middleware/checkAuth");
const Del = require("../../controller/auth/delete");
const googleLogin = require("../../controller/auth/googleLogin");

router.post("/register", register);
router.post("/login", login);
router.post("/sendmail", nodemailer);
router.get("/getUser", getUsernameMiddleware, getuser);
router.delete("/delete/:id", Del);
router.post("/google", googleLogin);

module.exports = router;
