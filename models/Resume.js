import { Schema, model, models } from "mongoose";

const ResumeSchema = new Schema(
  {
    name: String,
    birth: String,
    phone: Number,
    email: String,
    description: String,
    media: String,
    jobsId: String,
    accepted: Boolean,
    rejected: Boolean,
  },
  { timestamps: true }
);

const Resume = models.Resume || model("Resume", ResumeSchema);
export default Resume;