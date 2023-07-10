const express = require("express");

const todoController = require("../../controllers/TodoController");

const router = express.Router();

router.get("/:boardId", todoController.getByBoardId);
router.post("/", todoController.create);
router.put("/complete/:id", todoController.complete);
router.delete("/:id", todoController.delete);

module.exports = router;
