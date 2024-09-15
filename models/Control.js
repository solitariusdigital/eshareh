import { Schema, model, models } from "mongoose";

const ControlSchema = new Schema(
  {
    menu: {},
    live: Boolean,
  },
  { timestamps: true }
);

const Control = models.Control || model("Control", ControlSchema);
export default Control;
