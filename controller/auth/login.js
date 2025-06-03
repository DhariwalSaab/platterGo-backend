const { loginValidation } = require("../../services/validaitonSchema");
const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res, next) => {
  try {
    const loginValues = await loginValidation.validateAsync(req.body);
    console.log(loginValues);

    const { email, password } = loginValues;
    const s_key = process.env.SECRET_KEY;
    const userinfo = {
      email,
      password,
    };
    const jwtToken = jwt.sign(userinfo, s_key);

    // apply check
    const existingEmail = await User.findOne({ email });
    // const existingPassword = await User.findOne({ password })

    console.log("Existing Email ", existingEmail);
    // console.log("Existing password", existingPassword)

    if (!existingEmail) {
      return res.status(400).json({
        success: "false",
        message: "Invalid Email address , please register first",
      });
    }
    const passwordMatching = password === existingEmail.password;
    if (!passwordMatching) {
      return res.status(404).json({
        success: "false",
        message: "incorrect password , please enter correct",
      });
    }
    const role = existingEmail.role;

    return res.status(200).json({
      success: "true",
      message: "login Successfully",
      jwtToken,
      role,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
