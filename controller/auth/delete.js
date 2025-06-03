const User = require("../../models/user.model");
const delUser = async (req, res) => {
  try {
    deletedUser = await User.findByIdAndDelete({ _id: req.params.id });
    if (!deletedUser) {
      return res.status(404).json({ message: "user not found" });
    } else {
      return res.status(200).json({ message: "deleted successful" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = delUser;
