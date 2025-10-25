import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    projectId: String,
    title: String,
    description: String,
    users: [],
    status: String, // todo, in-progress, done
    priority: String, // low, medium, high
    dueDate: [
      {
        type: Date,
      },
    ],
  },
  { timestamps: true }
);

const Task = models.Task || model("Task", TaskSchema);
export default Task;
