const { Schema, model } = require("mongoose");
const foodchema = new Schema({
  // Title: {
  //   type: String,
  //   required: true,
  // },
  // Price: {
  //   type: String,
  //   required: true,
  // },
  // Quantity: {
  //   type: String,
  //   required: true,
  // },
  // Total: {
  //   type: String,
  //   required: true,
  // },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  cartItems: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  subtotal: { type: Number, required: true },
  deliveryFee: { type: Number, required: true },
  discount: { type: Number, required: false, default: 0 },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Preparing", "Prepared", "Take Your Order"],
    default: "Preparing",
  },
});

module.exports = model("Order", foodchema, "Orders");
