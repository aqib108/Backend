const express = require("express");
const {
  getAllRequisitions,
  createRequisition,
  updateRequisition,
  deleteRequisition,
  getSingleRequisition,
  createRequisitionReview,
} = require("../controller/RequisitionController");

const bids = require('./BidRoute')
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/requisitions").get(getAllRequisitions);

router.route("/requisition/new").post(isAuthenticatedUser, authorizeRoles("Organiztion") ,createRequisition);

router
  .route("/requisition/:id")
  .put(isAuthenticatedUser, authorizeRoles("Organiztion") ,updateRequisition)
  .delete(isAuthenticatedUser, authorizeRoles("Organiztion") ,deleteRequisition)
  .get(getSingleRequisition);


  router.route("/requisition/review").post(isAuthenticatedUser, authorizeRoles("Organiztion") , createRequisitionReview);


  router.use('/requisition/:id/bids', bids)


  

module.exports = router;
