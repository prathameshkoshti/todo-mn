const Board = require("../models/Board");
const AppError = require("../utils/appError");

class TodoController {
  static async getAll(req, res, next) {
    try {
      const boards = await Board.find();

      if (!boards) {
        console.log(
          new AppError(404, "Not found!", "No document found in the database."),
        );
      }

      res.status(200).json({
        success: true,
        results: boards.length,
        data: { boards },
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { name } = req.body;

      if (!name || name === "") {
        res.status(400).json({
          success: false,
          message: "Name is required field.",
        });
      }
      const board = await Board.create({
        name,
      });

      res.status(201).json({
        success: true,
        message: "Board created successfully.",
        data: { board },
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;

    try {
      const board = await Board.findByIdAndDelete(id);

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
        success: true,
        message: "Board deleted successfully.",
        data: { board },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TodoController;
