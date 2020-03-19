var express = require("express");
var todosRouter = require("./routes/todos");
var authRouter = require("./routes/auth");
require("dotenv/config");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

var app = express();
mongoose.connect(
  process.env.DB_CONNECTION_LOCAL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("success");
  }
);
// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/", authRouter);
app.use("/todo", todosRouter);

module.exports = app;

// app.listen(8080, () => {
//   console.log('Server is listening on http://localhost:8080');
// })
