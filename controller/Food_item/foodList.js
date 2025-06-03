const foodModle = require("../../models/foodItem.model");

const foodlist = async (req, res) => {
  try {
    list = await foodModle.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = foodlist;
