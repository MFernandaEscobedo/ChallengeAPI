const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const router = Router();

const { bestOptionsPerYear } = require("./controllers");

router.route("/bestOptionsPerYear/:year").get(asyncHandler(bestOptionsPerYear));

module.exports = router;
