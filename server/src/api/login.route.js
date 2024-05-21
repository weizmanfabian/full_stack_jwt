const express = require("express");
const { signIn } = require("../controllers/login.controller");
const router = express.Router();

router.post('/', signIn);

module.exports = router;