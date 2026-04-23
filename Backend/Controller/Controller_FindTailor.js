const TailorModel = require("../Models/TailorProfile");
const ReviewModel = require("../Models/Review_Model");

// ==========================
// GET DISTINCT CITIES
// ==========================
async function getDistinctCities(req, resp) {
  try {
    const cities = await TailorModel.distinct("city", {
      city: { $exists: true, $ne: "" },
    });

    const sorted = cities.filter(Boolean).sort();

    resp.status(200).json({
      status: true,
      cities: sorted,
    });
  } catch (err) {
    resp.status(500).json({ status: false, msg: err.message });
  }
}

// ==========================
// FIND TAILORS BY CITY + CATEGORY
// ==========================
// async function findTailors(req, resp) {
//   try {
//     const { city, category, page = 1, limit = 6 } = req.body;

//     if (!city) {
//       return resp.status(400).json({ status: false, msg: "City is required" });
//     }

//     // Build query
//     const query = { city: { $regex: new RegExp(`^${city}$`, "i") } };

//     if (category && category !== "") {
//       // Match tailors who serve this category (Men / Women / Children / Both)
//       query.$or = [
//         { category: { $regex: new RegExp(category, "i") } },
//         { category: "Both" },
//       ];
//     }

//     const skip = (Number(page) - 1) * Number(limit);
//     const total = await TailorModel.countDocuments(query);
//     const tailors = await TailorModel.find(query)
//       .skip(skip)
//       .limit(Number(limit))
//       .lean();

//     // Attach avg rating for each tailor
//     const tailorsWithRatings = await Promise.all(
//       tailors.map(async (tailor) => {
//         const reviews = await ReviewModel.find({ tailorId: tailor._id });
//         const avgRating =
//           reviews.length > 0
//             ? parseFloat(
//                 (
//                   reviews.reduce((sum, r) => sum + r.rating, 0) /
//                   reviews.length
//                 ).toFixed(1)
//               )
//             : 0;
//         return {
//           ...tailor,
//           avgRating,
//           totalReviews: reviews.length,
//         };
//       })
//     );

//     resp.status(200).json({
//       status: true,
//       tailors: tailorsWithRatings,
//       total,
//       totalPages: Math.ceil(total / Number(limit)),
//       currentPage: Number(page),
//     });
//   } catch (err) {
//     console.error("FIND TAILORS ERROR:", err);
//     resp.status(500).json({ status: false, msg: err.message });
//   }
// }
async function findTailors(req, resp) {
  try {
    const { city, category, page = 1, limit = 6 } = req.body;

    // ✅ removed: if (!city) return 400

    // Build query
    const query = {};

    // ✅ only add city filter if a city is selected
    if (city && city.trim() !== "") {
      query.city = { $regex: new RegExp(`^${city}$`, "i") };
    }

    if (category && category !== "") {
      query.$or = [
        { category: { $regex: new RegExp(category, "i") } },
        { category: "Both" },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await TailorModel.countDocuments(query);
    const tailors = await TailorModel.find(query)
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const tailorsWithRatings = await Promise.all(
      tailors.map(async (tailor) => {
        const reviews = await ReviewModel.find({ tailorId: tailor._id });
        const avgRating =
          reviews.length > 0
            ? parseFloat(
                (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
              )
            : 0;
        return { ...tailor, avgRating, totalReviews: reviews.length };
      })
    );

    resp.status(200).json({
      status: true,
      tailors: tailorsWithRatings,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    });
  } catch (err) {
    console.error("FIND TAILORS ERROR:", err);
    resp.status(500).json({ status: false, msg: err.message });
  }
}

module.exports = { getDistinctCities, findTailors };