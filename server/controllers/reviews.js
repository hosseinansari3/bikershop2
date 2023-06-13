const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
const addReview = async (req, res) => {
  try {
    const body = req.body;

    console.log("body:" + JSON.stringify(body));

    const review = new Review({
      ...req.body,
    });

    const reviewDoc = await review.save();

    res.status(200).json({
      success: true,
      message: `Your review has been added successfully and will appear when approved!`,
      review: reviewDoc,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    console.log("slug-param:" + req.params.slug);

    const productDoc = await Product.findOne({ slug: req.params.slug });

    const hasNoBrand =
      productDoc?.brand === null || productDoc?.brand?.isActive === false;

    if (!productDoc || hasNoBrand) {
      return res.status(404).json({
        message: "No product found.",
      });
    }

    const reviews = await Review.find({
      product: productDoc._id,
    })
      .populate({
        path: "user",
        select: "firstName",
      })
      .sort("-created");

    res.status(200).json({
      reviews,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

// fetch all reviews api
const fetchAllReviews = async (req, res) => {
  try {
    console.log("fetch started");

    const reviews = await Review.find()
      .sort("-created")
      .populate({
        path: "user",
        select: "firstName",
      })
      .populate({
        path: "product",
        select: "name slug imageUrl",
      });

    const count = await Review.countDocuments();

    res.status(200).json({
      reviews,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

module.exports = { addReview, getProductReviews, fetchAllReviews };
