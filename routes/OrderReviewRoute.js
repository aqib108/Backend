const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  createReview,
  getAllReviews,
  getReviewsByOrder,
  updateOrderReview,
  scrapReviews
} = require("../controller/OrganizationController");

//post order review
router.post("/", createReview);

// get all Orders
router.get("/", getAllReviews);

//get review by order
router.get("/:OrderId", getReviewsByOrder);

//update a Order Review

router.put("/:id", updateOrderReview);

//scrape reviews

router.get("/scrape/reviews", scrapReviews);

// router.put("/", createReview);

module.exports = router;