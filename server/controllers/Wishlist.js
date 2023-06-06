const Wishlist = require("../models/wishlistModel");
var mongoose = require("mongoose");

const updateWishlist = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    productObjId = mongoose.Types.ObjectId(productId);
    userObjId = mongoose.Types.ObjectId(userId);
    console.log("p:" + productId);
    console.log("u:" + userId);

    const update = {
      productObjId,
      updated: Date.now(),
    };
    const query = { product: update.productObjId, user: userObjId };

    const updatedWishlist = await Wishlist.findOneAndUpdate(query, update, {
      new: true,
    });

    if (updatedWishlist !== null) {
      res.status(200).json({
        success: true,
        message: "Your Wishlist has been updated successfully!",
        wishlist: updatedWishlist,
      });
    } else {
      const wishlist = new Wishlist({
        product: productId,
        user: userId,
      });

      const wishlistDoc = await wishlist.save();
      console.log("wish created!");

      res.status(200).json({
        success: true,
        message: `Added to your Wishlist successfully!`,
        wishlist: wishlistDoc,
      });
    }
  } catch (e) {
    return res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const fetchWishlist = async (req, res) => {
  try {
    const user = req.params.user;
    userObjId = mongoose.Types.ObjectId(user);

    const wishlist = await Wishlist.find({ userObjId })
      .populate({
        path: "product",
        select: "title price image",
      })
      .sort("updatedAt");

    res.status(200).json({
      wishlist,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

module.exports = { fetchWishlist, updateWishlist };
