import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    projectId: String,
    title: String,
    description: String,
    users: [],
    status: String, // todo, progress, done
    priority: String, // low, medium, high, urgent
    dueDate: Date,
  },
  { timestamps: true }
);

const Task = models.Task || model("Task", TaskSchema);
export default Task;
