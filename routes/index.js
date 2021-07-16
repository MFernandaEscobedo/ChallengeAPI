const { Router } = require("express");
const router = Router();

/* GET home page. */
router.use(require("../api/bestOptionsPerYear/routes"));
router.use(require("../api/quoteCar/routes"));

module.exports = router;
