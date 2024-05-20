const express = require("express");
const { singIn } = require("../controllers/login.controller");
const router = express.Router();

router.post('/', singIn);

module.exports = router;