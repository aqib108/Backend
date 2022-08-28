const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  getAllBids,
  getBid,
  createBid,
  updateBid,
  deleteBid,
} = require("../controller/BidController");



// get all Bids

router.get("/", getAllBids);

// get one Bid

router.get("/:bidId", getBid);

//post all Bids

router.post("/", createBid);

//update a Bid

router.put("/:bidId", updateBid);

//delete a Bid

router.delete("/:bidId", deleteBid);



module.exports = router;