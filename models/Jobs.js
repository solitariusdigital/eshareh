import { Schema, model, models } from "mongoose";

const JobsSchema = new Schema(
  {
    fields: [],
    active: Boolean,
    jobsId: String,
  },
  { timestamps: true }
);

const Jobs = models.Jobs || model("Jobs", JobsSchema);
export default Jobs;
