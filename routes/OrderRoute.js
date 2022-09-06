const express = require("express");

const router = express.Router();
const {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getAllUserOrders
} = require("../controller/OrderController");



// get all Orders

router.get("/", getAllOrders);

// get one Order

router.get("/:id", getOrder);

// get user Orders

router.get("/user/:organizationId", getAllUserOrders);

//post all Orders

router.post("/", createOrder);

//update a Order

router.put("/:id", updateOrder);

//delete a Order

router.delete("/:id", deleteOrder);



module.exports = router;