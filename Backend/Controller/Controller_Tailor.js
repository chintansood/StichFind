const path = require("path");
const fs = require("fs");
const Tailor = require("../Models/TailorProfile");
const cloudinary = require("cloudinary").v2;
const Tesseract = require("tesseract.js");

// ================= CLOUDINARY =================
cloudinary.config({
  cloud_name: "dgmlt4mve",
  api_key: "856225115114259",
  api_secret: "EYVgAeFr0Rw3ePM3OR6ajyzElZk",
});

// ================= UPLOAD DIR =================
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

//
// ================= SAVE / UPDATE PROFILE =================
//
async function saveOrUpdateTailorProfile(req, resp) {
  try {
    if (!req.body.email) {
      return resp.status(400).json({ msg: "Email required" });
    }

    // ---------- PROFILE PIC ----------
    if (req.files && req.files.profilepic) {
      const picPath = path.join(
        uploadDir,
        Date.now() + "-" + req.files.profilepic.name
      );
      await req.files.profilepic.mv(picPath);
      const upload = await cloudinary.uploader.upload(picPath);
      req.body.profileImage = upload.url;
      fs.unlinkSync(picPath);
    }

    // ---------- AADHAAR IMAGE ----------
    if (req.files && req.files.aadhaarcard) {
      const aadPath = path.join(
        uploadDir,
        Date.now() + "-" + req.files.aadhaarcard.name
      );
      await req.files.aadhaarcard.mv(aadPath);
      const upload = await cloudinary.uploader.upload(aadPath);
      req.body.aadhaarImage = upload.url;
      fs.unlinkSync(aadPath);
    }

    const data = await Tailor.findOneAndUpdate(
      { email: req.body.email },
      req.body,
      {
        upsert: true,
        returnDocument: "after",
      }
    );

    resp.status(200).json({
      status: true,
      msg: "Profile saved successfully",
      data,
    });
  } catch (err) {
    console.error("SAVE ERROR:", err);
    resp.status(500).json({ msg: err.message });
  }
}

//
// ================= SEARCH =================
//
async function searchTailor(req, resp) {
  try {
    const data = await Tailor.findOne({ email: req.body.email });
    if (!data) return resp.status(404).json({ msg: "Not found" });

    resp.status(200).json({
      status: true,
      data,
    });
  } catch (err) {
    resp.status(500).json({ msg: err.message });
  }
}

//
// ================= AADHAAR OCR ONLY =================
//
const sharp = require("sharp");

function doExtractAadhaar(req, resp) {
  if (!req.files || !req.files.aadhaarcard) {
    return resp.status(200).json({ status: false, msg: "No file uploaded" });
  }

  const fileName = Date.now() + "-" + req.files.aadhaarcard.name;
  const filePath = path.join(uploadDir, fileName);
  const processedPath = filePath + "_processed.png";  // ✅ preprocessed file

  req.files.aadhaarcard
    .mv(filePath)
    .then(() =>
      sharp(filePath)
        .resize({ width: 1200 })        // ✅ scale up small images
        .greyscale()                     // ✅ greyscale improves OCR
        .normalise()                     // ✅ boost contrast
        .sharpen()                       // ✅ sharpen text
        .png()
        .toFile(processedPath)
    )
    .then(() => Tesseract.recognize(processedPath, "eng"))
    .then((result) => {
      const text = result.data.text;
      console.log("OCR TEXT:", text);   // ✅ log to verify extraction

      const aadhaarMatch = text.match(/\d{4}\s?\d{4}\s?\d{4}/);
      const aadhaarno = aadhaarMatch ? aadhaarMatch[0].replace(/\s/g, "") : "";
      const dobMatch = text.match(/(\d{2})[\/\-](\d{2})[\/\-](\d{4})/);
      let dob = "";
      if (dobMatch) dob = `${dobMatch[3]}-${dobMatch[2]}-${dobMatch[1]}`;
      let gender = "";
      if (/female/i.test(text)) gender = "Female";
      else if (/male/i.test(text)) gender = "Male";

      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      if (fs.existsSync(processedPath)) fs.unlinkSync(processedPath);

      resp.status(200).json({
        status: true,
        data: {
          aadhaar: aadhaarno,
          dob,
          gender,
        },
      });
    })
    .catch((err) => {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      if (fs.existsSync(processedPath)) fs.unlinkSync(processedPath);
      resp.status(200).json({ status: false, msg: err.message });
    });
}

module.exports = {
  saveOrUpdateTailorProfile,
  searchTailor,
  doExtractAadhaar,
};