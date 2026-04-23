const mongoose = require("mongoose");

let isConnected = false;

async function dbconnect() {
  if (isConnected) return;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI missing");
  }

  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  isConnected = true;
  console.log("✅ DB Connected");
}

module.exports = { dbconnect };