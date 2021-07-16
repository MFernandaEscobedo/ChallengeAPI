const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const router = Router();

const { quoteCar } = require("./controllers");

router.route("/quoteCar").get(asyncHandler(quoteCar));

module.exports = router;
