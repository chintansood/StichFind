require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { dbconnect } = require("./Config/DBconfig");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbconnect();

app.get("/", (req, res) => {
  res.send("WORKING");
});

module.exports = app;