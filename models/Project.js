import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: String,
    description: String,
    users: [],
    adminsId: [],
    dueDate: [
      {
        type: Date,
      },
    ],
  },
  { timestamps: true }
);

const Project = models.Project || model("Project", ProjectSchema);
export default Project;
