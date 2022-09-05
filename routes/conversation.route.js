const express = require('express')
const router = express.Router()
const controller = require('../controller/conversation.controller')


router.route('/create').post(controller.create)
router.route('/get/:userId').get(controller.get)
router.route('/getUser/:userId/:conversationId').get(controller.getUser)

router.route('/delete/:conversationId').delete(controller.delete)

router.route('/getConversation').post(controller.setActiveConversations)




module.exports = router