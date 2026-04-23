require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { dbconnect } = require("./Config/DBconfig");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    await dbconnect();
    res.send("WORKING + DB");
  } catch (err) {
    console.error("DB root error:", err.message);
    res.status(500).send("DB ERROR: " + err.message);
  }
});

module.exports = app;