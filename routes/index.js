const { Router } = require("express");
const router = Router();

/* GET home page. */
router.use(require("../api/endpoints/routes"));

module.exports = router;
