// const Converastion = require("../../models/conversation.model");
const Converastion = require("../modals/conversation.model");
// const User = require("../../models/users.model");
const User = require("../modals/UserModal");
// const Message = require("../../models/message.model");
const Message = require("../modals/message.model");

exports.create = async (req, res, next) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    return res.send({
      success: true,
      savedConversation,
    });
  } catch (error) {
    return next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    return res.send({
      success: true,
      conversation,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { userId, conversationId } = req.params;
    console.log(req.params);
    if (userId) {
      const dietitian = await User.findOne(
        { _id: userId },
        "firstName lastName visuals.profileImage education.credential education.certificate  isActive"
      ).lean(true);

      let filter = { conversationId: conversationId };
      const limit = 1;

      const message = await Message.aggregate([
        { $match: filter },
        { $sort: { createdAt: -1 } },
        { $limit: limit },
        {
          $project: {
            _id: 1,
            text: 1,
            createdAt: 1,
            sender: 1,
          },
        },
      ]);
      dietitian.message = message[0];

      if (dietitian)
        return res.json({
          success: true,
          message: "Retrieved successfully",
          dietitian,
          message,
        });
      else
        return res.status(400).send({
          success: false,
          message: "Dietitian not found for given Id",
        });
    } else
      return res
        .status(400)
        .send({ success: false, message: "Dietitian Id is required" });
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.deleteOne({ _id: conversationId });
    const message = await Message.deleteMany({
      conversationId: { $in: conversationId },
    });
    if (conversation) {
      return res.send({
        success: true,
        message: "Deleted successfully",
      });
    }
  } catch (err) {
    return next(err);
  }
};

exports.setActiveConversations = async (req, res, next) => {
  try {
    console.log("dssdfds");
    const {id1 , id2} = req.body;

    const conversations = await Conversation.aggregate([
      {
        $match: (members = {
          $and: [
            { $or: [{ "members.0": id1 }, { "members.1": id1 }] },
            { $or: [{ "members.0": id2 }, { "members.1": id2 }] },
          ],
        }),
      },
    ]);
    if (conversations) {
      return res.send({
        success: true,
        conversations
      });
    }
  } catch (err) {
    return next(err);
  }
};
