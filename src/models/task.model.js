import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  completed: { type: Boolean, default: false },
  completedAt: { type: String, default: null },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

export default mongoose.model('Task', taskSchema)