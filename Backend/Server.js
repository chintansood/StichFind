require("dotenv").config();


const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const tailorRoutes = require("./Routes/tailorRoutes");
const userRoutes = require("./Routes/User_routes");
const reviewRoutes = require("./Routes/Review_routes");
const customerRoutes = require("./Routes/customer_prorotes");
var { dbconnect } = require("./Config/DBconfig");


dbconnect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// ROUTES
app.use("/tailor", tailorRoutes);
app.use("/user", userRoutes);
app.use("/review", reviewRoutes);
app.use("/customer", customerRoutes);

// DB
// mongoose
//   .connect("mongodb://127.0.0.1:27017/tailordb")
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
module.exports = app;