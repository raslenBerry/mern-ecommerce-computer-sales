const jwt = require('jsonwebtoken');

const verifyTokenController = {
    verifyToken: function(req, res, next) {
        const authHeader = req.headers.token;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.JWT_SEC, (err, user) => {
                if (err) {
                    return res.status(403).send('Token is not valid!');
                }
                
                req.user = user;
                next();
            });
        } else {
            return res.status(401).send('You are not authenticated!');
        }
    },
    verifyTokenAndAuth: function(req, res, next) {
        verifyTokenController.verifyToken(req, res, () => {
            if (req.user._id === req.params.id || req.user.isAdmin) {
                next();
            } else {
                res.status(403).send('You are not allowed to do that!');
            }
        });
    },
    verifyTokenAndAdmin: function(req, res, next) {
        verifyTokenController.verifyToken(req, res, () => {
            if (req.user.isAdmin) {
                next();
            } else {
                res.status(403).send('You are not allowed to do that!');
            }
        });
    },
}

module.exports = verifyTokenController;
