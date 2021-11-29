
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if(req.userRole === 'buyer'){
        return next();
    }
    const error = new Error("Not Authorized")
    error.statusCode = 403
    throw error
}