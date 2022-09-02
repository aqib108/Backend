const express = require('express')
const router = express.Router()
const controller = require('../controller/message.controller')

// const uploadsDir = "./src/uploads/";
// const { cpUpload } = require('../../../utils/upload')

router.route('/create').post(controller.create)
router.route('/get/:conversationId').get(controller.get)
router.route('/search').post(controller.search)

router.route('/delete/:conversationId').delete(controller.delete)


// router.route("/sendImage").post(cpUpload, controller.sendImage);

module.exports = router