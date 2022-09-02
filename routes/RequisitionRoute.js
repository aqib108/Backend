const express = require("express");
const {
  getAllRequisitions,
  createRequisition,
  updateRequisition,
  deleteRequisition,
  getSingleRequisition,
  createRequisitionReview,
  getOrganizationRequisition
} = require("../controller/RequisitionController");

const bids = require('./BidRoute')
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/requisitions").get(getAllRequisitions);

router.route("/requisition/new").post(createRequisition);

router
  .route("/requisition/:id")
  .put(updateRequisition)
  .delete(deleteRequisition)
  .get(getSingleRequisition);


  router.route("/requisition/review").post(createRequisitionReview);


  router.use('/requisition/:id/bids', bids)

  router.route("/organization/requisitions/:requisionId").get(getOrganizationRequisition);
  

module.exports = router;
