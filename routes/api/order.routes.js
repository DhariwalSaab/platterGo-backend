const router = require("express").Router();
const getOrder = require("../../controller/Order_item/getOrder");
const Orderlist = require("../../controller/Order_item/Orderlist");
// const update = require("../../controller/Order_item/update");
const Order = require("../../models/order.model");
router.post("/orders", getOrder);
router.get("/viweorderList", Orderlist);
router.put("/updateStatus/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  // Optional: Validate allowed statuses
  const validStatuses = ["Preparing", "Prepared", "Take Your Order"];
  if (!validStatuses.includes(status)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid status value" });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({
      success: true,
      message: "Order status updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
module.exports = router;
