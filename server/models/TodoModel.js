const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var TodoSchema = new Schema(
    {
        name: String,
        priority_level: Number,
        deadline: Date,
        status: String,
        userId: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    {
        timestamps: true
    }
);


TodoSchema.methods.responseModel = function () {
    return {
        todo_id:  this.id,
        todo_name:  this.name,
        priority_level:  this.priority_level,
        status:  this.status,
        deadline:  this.deadline
    };
};


var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;