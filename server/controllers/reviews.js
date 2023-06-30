const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
var mongoose = require("mongoose");

const addReview = async (req, res) => {
  try {
    const body = req.body;
    const user = req.user;

    console.log("user:" + JSON.stringify(user));

    const review = new Review({
      ...req.body,
      user: user.id,
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
        select: "title slug imageUrl",
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

const fetchMyReviews = async (req, res) => {
  const user = req.user;
  userObjId = mongoose.Types.ObjectId(user.id);

  const reviews = await Review.find({
    user: userObjId,
  })
    .populate({
      path: "product",
      select: "title ",
    })
    .sort("updatedAt");
  console.log("myReviews:" + JSON.stringify(reviews));
  res.json(reviews);
};

module.exports = {
  addReview,
  getProductReviews,
  fetchAllReviews,
  fetchMyReviews,
};
