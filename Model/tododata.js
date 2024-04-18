import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

// create a method which will remove the password from the response
todoSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._id;
    delete obj.__v;
    delete obj.password;
    return obj;
};


todoSchema.statics.checkDuplicateTodo = async function (todo,created_by) {
    const existingTodo = await this.findOne({ todo,created_by });
    return existingTodo;
}

// encrypt the password before saving the user
todoSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});


var tododata = mongoose.model('tododata', todoSchema);

export default tododata;