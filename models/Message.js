import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    chatId: String,
    senderId: String,
    type: String,
    content: String,
    fileUrl: String,
    fileType: String,
    isDeleted: Boolean,
    isEdited: Boolean,
  },
  { timestamps: true }
);

const Message = models.Message || model("Message", MessageSchema);
export default Message;
