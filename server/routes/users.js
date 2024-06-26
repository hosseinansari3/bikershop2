const express = require("express");
const {
  register,
  signIn,
  fetchUsers,
  deleteUser,
  updateUser,
  getCurrentUser,
  searchUser,
  updateUserAdress,
  editeAddress,
} = require("../controllers/Users");
const upload = require("../middlewares/uploadFile");
const { protectRoute } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", fetchUsers);
router.get("/me", protectRoute, getCurrentUser);
router.get("/list/search/:name", searchUser);

router.post("/register", register);

router.post("/signin", signIn);
router.delete(`/:id`, deleteUser);
router.put("/", upload, protectRoute, updateUser);
router.put("/updateAddress", protectRoute, updateUserAdress);
router.put("/editeAddress", protectRoute, editeAddress);

module.exports = router;
