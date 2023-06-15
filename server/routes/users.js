const express = require("express");
const {
  register,
  signIn,
  fetchUsers,
  deleteUser,
  updateUser,
} = require("../controllers/Users");

const router = express.Router();

router.get("/", fetchUsers);

router.post("/register", register);

router.post("/signin", signIn);
router.delete(`/:id`, deleteUser);
router.put("/", updateUser);

module.exports = router;
