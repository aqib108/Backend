const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  createReview,
} = require("../controller/OrganizationController");

// get messages by user

// router.get("/:user_id", getMeesagesByUserId);

//post Review

router.put("/", createReview);

module.exports = router;