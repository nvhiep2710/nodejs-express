const express = require("express");
const router = express.Router();
const totoController = require("../controller/todoController");
const isLoggedIn = require("../routes/isLoggedIn");
/* GET list todo. */
router.get("/", isLoggedIn, totoController.index);

/* POST add todo. */
router.post("/add", isLoggedIn, totoController.create);

/* GET find todo. */
router.get("/:id", isLoggedIn, totoController.find);

/* PATCH update todo. */
router.patch("/:id", isLoggedIn, totoController.update);

/* DELETE delete todo. */
router.delete("/:id", isLoggedIn, totoController.delete);

/* POST change status todo. */
router.post("/change-status", isLoggedIn, totoController.changeStatus);

/* DELETE delete todo complete. */
router.delete("/delete/complete", isLoggedIn, totoController.deleteComplele);

module.exports = router;
