const mongoose = require("mongoose");

async function dbconnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (err) {
    console.log("DB Connection Error:", err.message);
  }
}

module.exports = { dbconnect };