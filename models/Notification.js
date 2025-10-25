import { Schema, model, models } from "mongoose";

const NotificationSchema = new Schema(
  {
    userId: String,
    itemId: String,
    type: String, // task, chat,
    isRead: Boolean,
  },
  { timestamps: true }
);

const Notification =
  models.Notification || model("Notification", NotificationSchema);
export default Notification;
