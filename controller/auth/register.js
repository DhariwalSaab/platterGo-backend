const User = require("../../models/user.model");
const { registrationValidation } = require("../../services/validaitonSchema");
const sendmail = require("./nodemailer");

const register = async (req, res, next) => {
  try {
    const registerValues = await registrationValidation.validateAsync(req.body);
    console.log(registerValues);
    const { fullname, password, gender, address, phone, email, role } =
      registerValues;

    const userVerification = await User.findOne({
      email,
    });

    console.log(userVerification);
    if (userVerification) {
      return res.status(200).json({
        success: false,
        message: "User already exists",
      });
    }

    const newUser = new User({
      fullname,
      password,
      gender,
      address,
      phone,
      email,
      role,
    });
    await newUser.save();

    try {
      await sendmail(email, password);
    } catch (err) {
      console.log(err);
    }
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: registerValues,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
