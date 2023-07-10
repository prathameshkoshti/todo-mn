const mongoose = require("mongoose");
const Todo = require("../models/Todo");
const AppError = require("../utils/appError");

class TodoController {
  static async create(req, res, next) {
    try {
      const { desc, boardId } = req.body;

      if (!desc || desc === "") {
        res.status(400).json({
          status: "failed",
          message: "Name is required field.",
        });
      }
      const todo = await Todo.create({
        desc,
        boardId: new mongoose.Types.ObjectId(boardId),
      });

      res.status(201).json({
        success: true,
        message: "Todo created successfully.",
        data: { todo },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getByBoardId(req, res, next) {
    try {
      const { boardId } = req.params;
      const todo = await Todo.find({ boardId });

      if (!todo) {
        console.log(
          new AppError(404, "Not found!", "No document found in the database."),
        );
      }

      res.status(200).json({
        status: "success",
        message: "Todo updated successfully.",
        data: { todo },
      });
    } catch (error) {
      next(error);
    }
  }

  static async complete(req, res, next) {
    const { id } = req.params;

    const todo = await Todo.findByIdAndUpdate(
      id,
      {
        $set: {
          isComplete: true,
        },
      },
      { new: true },
    );

    if (!todo) {
      next(
        new AppError(
          404,
          "Not found!",
          "No document found in the database to update.",
        ),
      );
    }

    res.status(200).json({
      success: true,
      message: "Todo completed successfully.",
      data: { todo },
    });
  }

  static async delete(req, res, next) {
    const { id } = req.params;

    try {
      const board = await Todo.findByIdAndDelete(id);

      if (!board) {
        next(
          new AppError(
            404,
            "Not found!",
            "No document found in the database to update.",
          ),
        );
      }

      res.status(200).json({
        status: "success",
        message: "Todo deleted successfully.",
        data: { board },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TodoController;
