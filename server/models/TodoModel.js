const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var TodoSchema = new Schema(
    {
        name: String,
        priority_level: Number,
        difficulty_level: Number,
        // deadline: Date,
        status: Boolean,
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
        difficulty_level:  this.difficulty_level,
        status:  this.status
    };
};


var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;