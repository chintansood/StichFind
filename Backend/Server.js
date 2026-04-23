require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { dbconnect } = require("./Config/DBconfig");
const userRoutes = require("./Routes/User_routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    await dbconnect();
    res.send("WORKING + DB");
  } catch (err) {
    res.status(500).send("DB ERROR: " + err.message);
  }
});

app.use("/user", userRoutes);

module.exports = app;