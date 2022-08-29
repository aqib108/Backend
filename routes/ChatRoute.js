const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  getMeesagesByUserId,
  createMessage,
} = require("../controller/ChatController");



// get messages by user

router.get("/:user_id", getMeesagesByUserId);

//post Message

router.post("/", createMessage);

module.exports = router;