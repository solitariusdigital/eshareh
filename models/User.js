import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    permission: String,
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
