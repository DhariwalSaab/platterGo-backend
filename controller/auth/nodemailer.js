const nodeMail = require("nodemailer");
require("dotenv").config();

const sendmail = async (email, password) => {
  try {
    let config = {
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    };

    let transporter = nodeMail.createTransport(config);

    let message = {
      from: process.env.USER,
      to: email,
      subject: "User Account Created Successfully",
      html: `<h2>Welcome!</h2>
        <p>Your account has been created successfully.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>`,
    };

    await transporter.sendMail(message);

    return { success: true, email };
  } catch (err) {
    console.error("Error sending email:", err);
    return { success: false, error: err.message };
  }
};

module.exports = sendmail;
