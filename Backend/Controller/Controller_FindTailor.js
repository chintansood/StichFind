const TailorModel = require("../Models/TailorProfile");
const ReviewModel = require("../Models/Review_Model");

async function getDistinctCities(req, resp) {
  try {
    const cities = await TailorModel.distinct("city", {
      city: { $exists: true, $ne: "" },
    });
    const sorted = cities.filter(Boolean).sort();
    resp.status(200).json({ status: true, cities: sorted });
  } catch (err) {
    resp.status(500).json({ status: false, msg: err.message });
  }
}

async function findTailors(req, resp) {
  try {
    const { city, category, page = 1, limit = 6 } = req.body;

    const query = {};

    if (city && city.trim() !== "") {
      query.city = { $regex: new RegExp(`^${city}$`, "i") };
    }

    if (category && category.trim() !== "") {
      query.$or = [
        { category: { $regex: new RegExp(category, "i") } },
        { category: "Both" },
      ];
    }

    // ✅ Only show tailors who have completed their profile
    query.fullName = { $exists: true, $ne: "" };
    query.phone = { $exists: true, $ne: "" };

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