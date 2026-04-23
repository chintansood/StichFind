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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// fileUpload sabse last me test karna better hai
app.use(fileUpload());

app.get("/", async (req, res) => {
  try {
    await dbconnect();
    res.send("Backend running");
  } catch (err) {
    res.status(500).send("DB ERROR: " + err.message);
  }
});

// ensure DB connected before routes
app.use(async (req, res, next) => {
  try {
    await dbconnect();
    next();
  } catch (err) {
    res.status(500).json({ status: false, msg: "DB connection failed", error: err.message });
  }
});

app.use("/tailor", tailorRoutes);
app.use("/user", userRoutes);
app.use("/review", reviewRoutes);
app.use("/customer", customerRoutes);

module.exports = app;