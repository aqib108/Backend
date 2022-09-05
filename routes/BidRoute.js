const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  getAllBids,
  getBid,
  createBid,
  updateBid,
  deleteBid,
  updateBidStatus
} = require("../controller/BidController");



// get all Bids

router.get("/", getAllBids);

// get one Bid

router.get("/:bidId", getBid);

//post all Bids

router.post("/", createBid);

//update a Bid

router.put("/:bidId", updateBid);

//update a Bid status

router.put("/status/:bidId/:requisitionId", updateBidStatus);

//delete a Bid

router.delete("/:bidId", deleteBid);

module.exports = router;