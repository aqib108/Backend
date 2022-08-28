const express = require("express");

const router = express.Router();
const {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/OrderController");



// get all Orders

router.get("/", getAllOrders);

// get one Order

router.get("/:id", getOrder);

//post all Orders

router.post("/", createOrder);

//update a Order

router.put("/:id", updateOrder);

//delete a Order

router.delete("/:id", deleteOrder);



module.exports = router;