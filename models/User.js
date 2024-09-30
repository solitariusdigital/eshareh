import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      fa: String,
      en: String,
    },
    title: {
      fa: String,
      en: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    media: String,
    permission: String,
    display: Boolean,
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
