const Order = require("../../models/order.model"); // Make sure the model name matches

const userOrder = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipCode,
      country,
      phone,
      cartItems,
      subtotal,
      deliveryFee,
      discount,
      totalAmount,
      status,
    } = req.body; // ✅ no need to await req.body

    const newOrder = new Order({
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipCode,
      country,
      phone,
      cartItems,
      subtotal,
      deliveryFee,
      discount,
      totalAmount,
      status: "Preparing",
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Order placed successfully!",
    });
  } catch (error) {
    next(error); // Optional: you can also send res.status(500).json({ message: error.message })
  }
};

module.exports = userOrder;
