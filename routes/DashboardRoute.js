const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  getDashboard
} = require("../controller/AdminController");
// get dashboard statics

router.get("/", getDashboard);

module.exports = router;