import mongoose from "mongoose";
const todoSchema = mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        default: new Date().getTime().toString(),
    },
    password: {
        type: String,
        required: true,
    },
    created_by: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    updated_at: {
        type: Date,
        default: new Date(),
    },
});

var tododata = mongoose.model('tododata', todoSchema);

export default tododata;