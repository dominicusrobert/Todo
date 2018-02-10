const jwt = require('jsonwebtoken');


class AuthHelper{

    static isAuthenticateAndAuthorized(request, response, next) {

        jwt.verify(request.headers.jwt, process.env.SECRET_KEY, function (err, decoded) {
            if(decoded && decoded.id != null){
                // add userId (decoded from JWT) through response.locals
                response.locals.userId = decoded.id;
                next();
            }
            else {
                response.status(401).json({ message : 'Unauthorized'});
            }
        });
        
    }

}

module.exports = AuthHelper;