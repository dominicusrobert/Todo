const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        name: String,
        email: String
    },
    {
        timestamps: true
    }
);


UserSchema.statics.findOneOrCreate = function findOneOrCreate(condition, datauser, callback) {
    const self = this
    self.findOne(condition, function (err, result) {
        if (result) {
            return callback(err, result)
        }
        else {
            self.create(datauser, function (err, result) {
                return callback(err, result)
            })
        }
    })
}


var User = mongoose.model('User', UserSchema);

module.exports = User;