const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  createPayment,
  getAllPayment,
  getPaymentByOrder
} = require("../controller/PaymentController");

//post order payment
router.post("/", createPayment);

// get all Orders payment
router.get("/", getAllPayment);

//get payment by order
router.get("/:OrderId", getPaymentByOrder);

module.exports = router;