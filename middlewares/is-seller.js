
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log("role", req.userRole);
    if(req.userRole == 'seller'){
        console.log("selllller")
        return next();
    }
    const error = new Error("Not Authorized")
    error.statusCode = 403;
    throw error
}