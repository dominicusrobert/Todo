const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var TodoSchema = new Schema(
    {
        name: String,
        priority_level: Number,
        difficulty_level: Number,
        // deadline: Date,
        status: Boolean,
        userId : { type: Schema.Types.ObjectId, ref: 'User' }
    },
    {
        timestamps: true
    }
);


var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;