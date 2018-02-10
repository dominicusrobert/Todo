const jwt = require('jsonwebtoken');

const UserModel = require('../models/UserModel.js');

class UserController {

    /**
     * CRUD Simple
     */

    static createOrGetUser(request, response) {
        var user = new UserModel({
            name: request.body.name,
            email: request.body.email
        });

        UserModel.findOneOrCreate(
            { email: request.body.email },
            user,
            function (err, data) {
                if (err) {
                    response.status(500).json(err);
                    return;
                }

                response.json({
                    token: jwt.sign(
                        {
                            id: data.id,
                            email: data.email
                        },
                        process.env.SECRET_KEY,
                        { expiresIn: process.env.JWT_EXPIRES_IN }
                    )
                });
            });
    }

    static editUser(request, response) {
        jwt.verify(request.headers.jwt, process.env.SECRET_KEY, function (err, decoded) {
            UserModel.findOne({ email: decoded.email })
                .exec()
                .then(user => {
                    user.name = request.body.name || user.name;
            
                    user.save((err, newValue) => {
                        if (err) {
                            response.status(500).json(err);
                            return;
                        }
                        response.json(newValue);
                    });
                })
                .catch(err => {
                    response.status(401).json('Invalid email');
                });
        });
    }

    static deleteUser(request, response) {
        jwt.verify(request.headers.jwt, process.env.SECRET_KEY, function (err, decoded) {
            UserModel.remove({ email: decoded.email })
                .exec()
                .then(data => {
                    console.log(data)
                    response.json({ message: 'Success Remove User' });
                })
                .catch(err => {
                    response.status(401).json('Invalid email');
                });
        });
    }

}

module.exports = UserController;