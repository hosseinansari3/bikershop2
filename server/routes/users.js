const express = require("express");
const {
  register,
  signIn,
  fetchUsers,
  deleteUser,
} = require("../controllers/Users");

const router = express.Router();
router.get("/", fetchUsers);
router.post("/register", register);
router.post("/signin", signIn);
router.delete(`/:id`, deleteUser);

module.exports = router;
