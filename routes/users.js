const express = require("express");
const router = express.Router();
let userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../validate/userValidation");

/* PUTH update user by id. */
router.put("/", authMiddleware, validate.update, userController.update);

module.exports = router;
