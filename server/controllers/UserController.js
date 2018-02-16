const jwt = require('jsonwebtoken');
const FB = require('fb');

const UserModel = require('../models/UserModel.js');

FB.options({ version: 'v2.8' });

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
                    message: 'Success get User Data',
                    token: jwt.sign(
                        data.responseModel(),
                        process.env.SECRET_KEY,
                        { expiresIn: process.env.JWT_EXPIRES_IN }
                    )
                });
            });

    }

    static createOrGetUserFromFacebook(request, response) {
        FB.setAccessToken(request.headers.fb_token);
        FB.api(
            `/me`,
            { fields: ['id', 'name', 'email'] },
            function (userResponse) {
                if (!userResponse || userResponse.error) {
                    response.send(!userResponse ? 'error occurred' : userResponse.error);
                    return;
                }

                var user = new UserModel({
                    name: userResponse.name,
                    email: userResponse.email
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
                            message: 'Success get User Data',
                            token: jwt.sign(
                                data.responseModel(),
                                process.env.SECRET_KEY,
                                { expiresIn: process.env.JWT_EXPIRES_IN }
                            )
                        });
                    }
                );
            }
        );
    }

    static editUser(request, response) {
        UserModel.findOne({ email: response.locals.userEmail })
            .exec()
            .then(user => {
                user.name = request.body.name || user.name;

                user.save((err, newValue) => {
                    if (err) {
                        response.status(500).json(err);
                        return;
                    }

                    response.json({
                        message: 'Success Update User Data',
                        data: newValue.responseModel()
                    });

                });
            })
            .catch(err => {
                response.status(500).json({message : 'Failed to update User'});
            });
    }

    static deleteUser(request, response) {
        UserModel.remove({ email: response.locals.userEmail })
            .exec()
            .then(data => {
                response.json({
                    message: "Success delete User",
                    id: data.id
                });
            })
            .catch(err => {
                response.status(500).json({message : 'Failed to delete User'});
            });
    }

}

module.exports = UserController;