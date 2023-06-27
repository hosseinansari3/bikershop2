const express = require("express");
const {
  register,
  signIn,
  fetchUsers,
  deleteUser,
  updateUser,
} = require("../controllers/Users");
const upload = require("../middlewares/uploadFile");
const { protectRoute } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", fetchUsers);

router.post("/register", register);

router.post("/signin", signIn);
router.delete(`/:id`, deleteUser);
router.put("/", upload, protectRoute, updateUser);

module.exports = router;
