
const express = require("express");
const router = express.Router();


const singlehoteHandler = require("../controllers/singleHotelController");

router.route("/:id")
.get(singlehoteHandler)

module.exports = router;