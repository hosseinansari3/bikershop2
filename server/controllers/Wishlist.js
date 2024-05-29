const Wishlist = require("../models/wishlistModel");
var mongoose = require("mongoose");

const updateWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    productObjId = mongoose.Types.ObjectId(productId);
    userObjId = mongoose.Types.ObjectId(user.id);

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
        user: user.id,
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
    const user = req.user;
    userObjId = mongoose.Types.ObjectId(user.id);

    console.log("ID: " + user.id);

    const wishlist = await Wishlist.find({ user: userObjId })
      .populate({
        path: "product",
        select: "title price images slug",
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

const deleteWishlist = async (req, res) => {
  const ids = req.params.id;
  var idsArr = ids.split(",");

  try {
    deletedWishlist = await Wishlist.deleteMany({ _id: { $in: idsArr } });
    res.status(200).json(idsArr);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
module.exports = { fetchWishlist, updateWishlist, deleteWishlist };
