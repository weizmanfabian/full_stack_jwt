const express = require("express");
const { createDefault, deleteDefault, findAllDefault, findByKeyDefault, updateDefault } = require("../controllers/controller.js");
const { verifyUser } = require("../controllers/login.controller.js");
const router = express.Router();

router.get("/:table", verifyUser, findAllDefault);
router.get("/:table/:key/:value", verifyUser, findByKeyDefault);
router.post("/:table/", verifyUser, createDefault);
router.put("/:table/:key/:value", verifyUser, updateDefault);
router.delete("/:table/:key/:value", verifyUser, deleteDefault);

module.exports = router;