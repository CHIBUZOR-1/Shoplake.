const jwt = require('jsonwebtoken');
const userModel = require('../models/users');

const verifyToken = async (req, res, next) => {
    try {
        const decode = jwt.verify(req.header('Authorization'), process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
    

}

const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if(user.admin !== "ADMIN") {
            return res.status(401).json({
                success: false,
                message: "unauthorized access"
            })
        } else {
           next();
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "middleware error"
        })
    }
}

module.exports = { verifyToken, isAdmin };