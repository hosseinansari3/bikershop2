const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
var mongoose = require("mongoose");

// Function to update the product rating
async function updateProductRating(productId) {
  // Calculate the average rating
  const averageResult = await Review.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  // Check if there are any reviews
  if (averageResult.length > 0) {
    const averageRating = averageResult[0].averageRating;
    const roundedAverage = Math.round(averageRating);
    // Update the product's rating
    await Product.updateOne(
      { _id: productId },
      {
        $set: { rating: roundedAverage },
      }
    );
  }
}

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

    console.log("body", typeof body.product);
    updateProductRating(mongoose.Types.ObjectId(body.product));

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

    const filters = req.query.filters;

    let query = {};

    if (filters?.status && filters?.status != "") {
      query.status = { $in: filters.status };
    }

    if (!productDoc || hasNoBrand) {
      return res.status(404).json({
        message: "No product found.",
      });
    }

    const reviews = await Review.find({
      product: productDoc._id,
      ...query,
    })
      .populate({
        path: "user",
        select: "firstName avatar",
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

const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const updated = req.body;

    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId },
      { $set: updated },
      { new: true }
    )
      .populate({
        path: "user",
        select: "firstName",
      })
      .populate({
        path: "product",
        select: "title slug images",
      });

    res.status(201).json(updatedReview);
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

// fetch all reviews api
const fetchAllReviews = async (req, res) => {
  try {
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    let skip = req.query.skip ? parseInt(req.query.skip) : 0;

    const reviews = await Review.find()
      .sort("-created")
      .populate({
        path: "user",
        select: "firstName",
      })
      .populate({
        path: "product",
        select: "title slug images",
      })
      .skip(skip)
      .limit(limit);

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

  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  const reviews = await Review.find({
    user: userObjId,
  })
    .populate({
      path: "product",
      select: "title ",
    })
    .sort("updatedAt")
    .limit(limit);
  console.log("myReviews:" + JSON.stringify(reviews));
  res.json(reviews);
};

module.exports = {
  addReview,
  updateReview,
  getProductReviews,
  fetchAllReviews,
  fetchMyReviews,
};
