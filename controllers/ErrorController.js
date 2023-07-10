/* eslint-disable no-param-reassign */
module.exports = (req, res) => {
  const error = {};
  error.statusCode = 500;
  error.status = "error";

  res.status(error.statusCode).json({
    status: error.status,
    error,
    message: error.message,
    stack: error.stack,
  });
};
