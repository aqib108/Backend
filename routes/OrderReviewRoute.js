const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  createReview,
  getAllReviews,
  getReviewsByOrder,
  updateOrderReview
} = require("../controller/OrganizationController");

//post order review
router.post("/", createReview);

// get all Orders
router.get("/", getAllReviews);

//get review by order
router.get("/:OrderId", getReviewsByOrder);

//update a Order Review

router.put("/:id", updateOrderReview);

// router.put("/", createReview);

module.exports = router;