const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth");

router.get("/register", register.index);
router.get("/login", login.index);

router.post("/register", register.authenticate);
router.post("/login", login.authenticate);

module.exports = router;
