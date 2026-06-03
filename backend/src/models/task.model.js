import mongoose, {Schema} from "mongoose";

const taskSchema = new Schema({
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    }
});

export const Task = mongoose.model("Task", taskSchema);