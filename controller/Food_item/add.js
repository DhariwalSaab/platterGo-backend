const foodModle = require("../../models/foodItem.model");

const addFood = async (req, res) => {
  const image_filename = req.file.filename;

  const add_item = new foodModle({
    name: req.body.name,
    description: req.body.description,
    image: image_filename,
    price: req.body.price,
    category: req.body.category,
  });
  try {
    await add_item.save();
    res
      .status(200)
      .json({ success: true, message: "add seccesfully", data: add_item });
  } catch (error) {
    console.log(error);
  }
};

module.exports = addFood;
