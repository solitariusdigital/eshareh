import { Schema, model, models } from "mongoose";

const ChatSchema = new Schema(
  {
    type: String, // private, public
    title: String,
    description: String,
    users: [],
    adminsId: [],
    lastMessageId: String,
    archive: Boolean,
  },
  { timestamps: true }
);

const Chat = models.Chat || model("Chat", ChatSchema);
export default Chat;
