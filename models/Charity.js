import { Schema, model, models } from "mongoose";

const CharitySchema = new Schema(
  {
    count: Number,
    maxCount: Number,
    nikibezabaneeshareh: Number,
  },
  { timestamps: true }
);

const Charity = models.Charity || model("Charity", CharitySchema);
export default Charity;
