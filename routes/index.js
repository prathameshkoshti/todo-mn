const express = require("express");

const router = express.Router();

const boardRoutes = require("./board");
const todoRoutes = require("./todo");

router.use("/todo", todoRoutes);
router.use("/boards", boardRoutes);

module.exports = router;
