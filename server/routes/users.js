const express = require("express");
const { register, signIn, fetchUsers } = require("../controllers/Users");

const router = express.Router();
router.get("/", fetchUsers);
router.post("/register", register);
router.post("/signin", signIn);

module.exports = router;
