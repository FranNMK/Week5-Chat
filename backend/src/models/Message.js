const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    conversationId: {
        type: Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    },
    senderId: {
        type: String, // Clerk user id
        required: true
    },
    text: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

// When we do Socket.IO later, we will broadcast new Message docs in real-time.

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
