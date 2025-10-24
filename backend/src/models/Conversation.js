const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    members: [
      {
        type: String, // we'll store Clerk user IDs as strings
        required: true
      }
    ]
    // for group chat, you'd also store a name, icon etc.
  },
  { timestamps: true }
);

conversationSchema.index({ members: 1 });

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
