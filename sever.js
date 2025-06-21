// step 1 mongo connection
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());

// step 2 cors is security feature in Node.js it handle which website can access your server.
app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  })
);

// step 3  routing
app.use(routes);
// app.use("/uploads", express.static("uploads"));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));

mongoose
  .connect("mongodb+srv://aditiyadhariwal:adi@backend-rest.dqq9j.mongodb.net/")
  .then(() => {
    app.listen(port, () => {
      console.log(`server started on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
