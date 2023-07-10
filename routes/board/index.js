const express = require("express");

const boardController = require("../../controllers/BoardController");

const router = express.Router();

router.get("/", boardController.getAll);
router.post("/", boardController.create);
router.delete("/:id", boardController.delete);

module.exports = router;
