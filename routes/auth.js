let express = require("express");
let router = express.Router();
var authController = require("../controller/authController");

/* POST login */
router.post("/login", authController.login);

/* POST register */
router.post("/register", authController.register);

module.exports = router;
