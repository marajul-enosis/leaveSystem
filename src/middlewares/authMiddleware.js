
const { validateToken } = require('../helpers/common.helper');

// This is a middleware function that will be used to check if the user is logged in or not

function authMiddleware(req, res, next) {

    // Get the token from the request header
    const token = req?.cookies?.token || undefined;

    // console.log("token", token)
    
    // If there is no token, return an error
    if (!token) {
        res.status(401).send({ status: "error", error: "Access denied. No token provided." });
        return next(new Error("Access denied. No token provided."))
    }

    // If there is a token, validate it
    try {
        const decoded = validateToken(token);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send({ status: "error", error: "Invalid token." });
        res.end();
        return next(new Error("Invalid token."));
    }

}

var middlewares = {
    authMiddleware
}

module.exports = middlewares;