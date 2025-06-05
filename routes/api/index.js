const router = require("express").Router();
const authRoutes = require("./Auth.routes");
const foodroutes = require("./food.route");
const Orderroutes = require("./order.routes");
router.use("/auth", authRoutes);
router.use("/food", foodroutes);
router.use("/order", Orderroutes);

router.get("/ping", (req, res) => {
  res.json({ success: "true", message: "successful request" });
});

module.exports = router;
