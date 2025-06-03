const order = require("../../models/order.model");

const getorderList = async (req, res) => {
  try {
    const list = await order.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = getorderList;
