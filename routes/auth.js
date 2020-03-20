let express = require("express");
let router = express.Router();
var authController = require("../controller/authController");

/* POST login */
router.post("/login", authController.login);

/* POST register */
router.post("/register", authController.register);

/* POST login social*/
router.post("/login-social", authController.loginsocial);

module.exports = router;
