const router = require("express").Router();
const multer = require("multer");
const addFood = require("../../controller/Food_item/add");
const foodlist = require("../../controller/Food_item/foodList");
// const getUsernameMiddleware = require("../../middleware/checkAuth");
const delItem = require("../../controller/Food_item/delete_item");
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), addFood);
router.get("/items", foodlist);
router.delete("/delete/:id", delItem);
module.exports = router;
