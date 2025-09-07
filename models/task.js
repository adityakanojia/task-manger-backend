const mongoose = require('mongoose');
const {Schema} = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending","done"],
        default: "pending",
    },
},{
    timestamps: true
});

module.exports = mongoose.model("Task",taskSchema)