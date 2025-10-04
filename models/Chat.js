import { Schema, model, models } from "mongoose";

const ChatSchema = new Schema(
  {
    type: String, // "private", "public"
    name: String,
    description: String,
    users: [],
    admins: [],
    lastMessage: String,
  },
  { timestamps: true }
);

const Chat = models.Chat || model("Chat", ChatSchema);
export default Chat;
