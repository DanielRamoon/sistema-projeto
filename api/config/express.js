const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const configureExpress = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(helmet());

  app.use(morgan("combined"));

  app.use(cors());
};

module.exports = configureExpress;
