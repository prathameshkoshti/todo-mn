const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const hpp = require("hpp");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const globalErrorHandler = require("./controllers/ErrorController");

const app = express();

const routes = require("./routes");

// Allow cross-origin policy
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Limit request from the same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from your IP address. Please try again later.",
});

app.use("/v1", limiter);

// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: "20kb",
  }),
);

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use("/v1", routes);

app.get("*", (req, res) => {
  res.status(404).send("Resource not found.");
});

app.use(globalErrorHandler);

module.exports = app;
