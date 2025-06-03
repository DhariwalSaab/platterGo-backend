const axios = require("axios");
const jwt = require("jsonwebtoken");
const { oauth2Client } = require("../../utils/googleClient");
const User = require("../../models/user.model"); // path to your User model
require("dotenv").config(); // ensure env variables are loaded

const googleLogin = async (req, res) => {
  try {
    const code = req.query.code;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    );

    const { email, name } = userRes.data;

    // Find or create user in DB
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        fullname: name,
        password: "", // or you can set a dummy password if needed
        isGoogleUser: true, // optional field to indicate Google auth
      });
    }

    // Sign JWT
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.SECRET_KEY
    );
    const fullname = user.fullname;

    // Respond
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        email: user.email,
        name: user.fullname,
      },
      fullname,
    });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = googleLogin;
