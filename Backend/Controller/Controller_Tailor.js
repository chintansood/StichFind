const path = require("path");
const fs = require("fs");
const Tailor = require("../Models/TailorProfile");
const cloudinary = require("cloudinary").v2;
const Tesseract = require("tesseract.js");
const sharp = require("sharp");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadDir = "/tmp";

async function saveOrUpdateTailorProfile(req, resp) {
  try {
    if (!req.body.email) {
      return resp.status(400).json({ msg: "Email required" });
    }

    if (req.files && req.files.profilepic) {
      const picPath = path.join(uploadDir, `${Date.now()}-${req.files.profilepic.name}`);
      await req.files.profilepic.mv(picPath);

      const upload = await cloudinary.uploader.upload(picPath);
      req.body.profileImage = upload.secure_url || upload.url;

      if (fs.existsSync(picPath)) fs.unlinkSync(picPath);
    }

    if (req.files && req.files.aadhaarcard) {
      const aadPath = path.join(uploadDir, `${Date.now()}-${req.files.aadhaarcard.name}`);
      await req.files.aadhaarcard.mv(aadPath);

      const upload = await cloudinary.uploader.upload(aadPath);
      req.body.aadhaarImage = upload.secure_url || upload.url;

      if (fs.existsSync(aadPath)) fs.unlinkSync(aadPath);
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

function doExtractAadhaar(req, resp) {
  if (!req.files || !req.files.aadhaarcard) {
    return resp.status(200).json({ status: false, msg: "No file uploaded" });
  }

  const fileName = `${Date.now()}-${req.files.aadhaarcard.name}`;
  const filePath = path.join(uploadDir, fileName);
  const processedPath = path.join(uploadDir, `${fileName}_processed.png`);

  req.files.aadhaarcard
    .mv(filePath)
    .then(() =>
      sharp(filePath)
        .resize({ width: 1200 })
        .greyscale()
        .normalise()
        .sharpen()
        .png()
        .toFile(processedPath)
    )
    .then(() => Tesseract.recognize(processedPath, "eng"))
    .then((result) => {
      const text = result.data.text;

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