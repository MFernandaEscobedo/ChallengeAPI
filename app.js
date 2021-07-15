let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

const { error404 } = require("./middlewares/error404");
const { generalErrorHandler } = require("./middlewares/generalErrorHandler");

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", require("./routes/index"));

// catch 404 and forward to error handler
app.use(error404);
app.use(generalErrorHandler);

module.exports = app;
