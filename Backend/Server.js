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

if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
  });
}

module.exports = app;