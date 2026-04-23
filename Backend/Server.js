require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const { dbconnect } = require("./Config/DBconfig");
const userRoutes = require("./Routes/User_routes");
const tailorRoutes = require("./Routes/tailorRoutes");
const reviewRoutes = require("./Routes/Review_routes");
const customerRoutes = require("./Routes/customer_prorotes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://stichfind.vercel.app/",
    
   
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(async (req, res, next) => {
  try {
    await dbconnect();
    next();
  } catch (err) {
    return res.status(500).json({
      status: false,
      msg: "DB connection failed",
      error: err.message
    });
  }
});

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use("/user", userRoutes);
app.use("/tailor", tailorRoutes);
app.use("/review", reviewRoutes);
app.use("/customer", customerRoutes);

module.exports = app;