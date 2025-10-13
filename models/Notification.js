import { Schema, model, models } from "mongoose";

const NotificationSchema = new Schema(
  {
    userId: String,
    chatId: String,
    messageId: String,
    type: String, // "message", "mention", "file"
    isRead: Boolean,
  },
  { timestamps: true }
);

const Notification =
  models.Notification || model("Notification", NotificationSchema);
export default Notification;
