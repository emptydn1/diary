const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const log = require("./api/logs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const middlewares = require("./middlewares");

mongoose
  .connect(
    "mongodb+srv://huy:anhkutedn1@cluster0-ueseb.mongodb.net/huy?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("database connect success");
  })
  .catch(err => {
    console.log(err, "err");
  });

const app = express();

app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({
    message: "hello"
  });
});
app.use("/log", log);

// error middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(PORT);
});
