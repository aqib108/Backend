const Converastion = require("../modals/conversation.model");
const Message = require("../modals/message.model");
exports.create = async (req, res, next) => {


  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    return next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const message = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(message);
  } catch (error) {
    return next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    let filters = {};
    console.log(req.body);
    if (req.body.text) {
      filters.firstName = { $regex: new RegExp(req.body.text), $options: "si" };
      filters.lastName = { $regex: new RegExp(req.body.text), $options: "si" };
      filters.message = { $regex: new RegExp(req.body.text), $options: "si" };
      filters.id = req.body._id;
    }
    console.log(filters, "filters");
    const conservations = await Conversation.aggregate([
      { $addFields: { conversation_id: { $toString: "$_id" } } },
      {
        $lookup: {
          from: "messages",
          localField: "conversation_id",
          foreignField: "conversationId",
          as: "message",
        },
      },
      { $unwind: "$message" },
      {
        $replaceRoot: {
          newRoot: {
            conservations_id: "$_id",
            member1: { $first: "$members" },
            member2: { $last: "$members" },
            messages: "$message.text",
            createdAt: "$message.createdAt",
          },
        },
      },
      { $match: { $or: [{ member1: filters.id }, { member2: filters.id }] } },

      {
        $project: {
          conservations_id: 1,
          messages: 1,
          createdAt: 1,
          newMember: {
            $cond: {
              if: { $eq: ["$member1", filters.id] },
              then: "$member2",
              else: "$member1",
            },
          },
        },
      },

      { $addFields: { friendId: { $toObjectId: "$newMember" } } },

      {
        $lookup: {
          from: "users",
          localField: "friendId",
          foreignField: "_id",
          as: "friend",
        },
      },
      { $unwind: "$friend" },

      {
        $replaceRoot: {
          newRoot: {
            conservations_id: "$conservations_id",
            myId: filters.id,
            friendId: "$friendId",
            messages: "$messages",
            createdAt: "$createdAt",
            firstName: "$friend.firstName",
            lastName: "$friend.lastName",
            isActive: "$friend.isActive",
            profileImage: "$friend.visuals.profileImage",
            certificate: "$friend.education.certificate",
            credential: "$friend.education.credential",
          },
        },
      },
      {
        $match: {
          messages: filters.message,
        },
      },
    ]);

    return res.send({
      success: true,
      status: 200,
      message: "Fetched Successfully",
      conservations,
    });
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { conversationId } = req.params;

    const message = await Message.deleteMany({
      conversationId: { $in: conversationId },
    });
    if (message) {
      return res.send({
        success: true,
        message: "Deleted successfully",
      });
    }
  } catch (err) {
    return next(err);
  }
};

exports.sendImage = async (req, res, next) => {

  let image = req.files.Image[0].filename;
  

  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(image);
  } catch (error) {
    return next(error);
  }
};
