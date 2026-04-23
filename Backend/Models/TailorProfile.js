const mongoose = require("mongoose");

const TailorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // -------- PERSONAL --------
    fullName: String,
    aadhaar: String,
    dob: String,
    gender: String,
    profileImage: String,
    aadhaarImage: String,

    // -------- PROFESSIONAL --------
    category: String,
    specialty: String,
    experience: String,
    website: String,
    workType: String,
    shopAddress: String,
    shopCity: String,

    // -------- CONTACT --------
    phone: String,
    city: String,
    address: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tailor", TailorSchema);
