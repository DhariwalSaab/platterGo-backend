const foodModle = require("../../models/foodItem.model");
const delItem = async (req, res) => {
  try {
    deletedItem = await foodModle.findByIdAndDelete({ _id: req.params.id });
    if (!deletedItem) {
      return res.status(404).json({ message: "item not found" });
    } else {
      return res.status(200).json({ message: "deleted successful" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = delItem;
