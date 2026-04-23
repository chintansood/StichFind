require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const tailorRoutes = require("./Routes/tailorRoutes");
const userRoutes = require("./Routes/User_routes");
const reviewRoutes = require("./Routes/Review_routes");
const customerRoutes = require("./Routes/customer_prorotes");
const { dbconnect } = require("./Config/DBconfig");

const app = express();

console.log("ENV CHECK:");
console.log("MONGO_URI:", process.env.MONGO_URI ? "FOUND" : "MISSING");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "FOUND" : "MISSING");
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "FOUND" : "MISSING");

dbconnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use("/tailor", tailorRoutes);
app.use("/user", userRoutes);
app.use("/review", reviewRoutes);
app.use("/customer", customerRoutes);

module.exports = app;