import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: String,
    description: String,
    users: [],
    adminsId: [],
    completed: Boolean,
    dateObject: {},
    dueDate: Date,
  },
  { timestamps: true }
);

const Project = models.Project || model("Project", ProjectSchema);
export default Project;
