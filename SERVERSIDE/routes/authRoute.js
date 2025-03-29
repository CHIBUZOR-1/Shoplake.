const express = require('express');
const userRouter = express.Router();
const { userRegisteration, userLogin, testController, forgotPassword, allUsers, updateUserRole } = require('../controllers/authContorller');
const {verifyToken, isAdmin} = require('../utils/authHelper');

userRouter.post('/register', userRegisteration);
userRouter.post('/login', userLogin );
userRouter.post('/forgot-password', forgotPassword);
userRouter.get('/all_users', verifyToken, isAdmin, allUsers);
userRouter.get('/test', verifyToken, isAdmin, testController);
userRouter.put('/update_role/:id', verifyToken, isAdmin, updateUserRole);
userRouter.get('/user-pass', verifyToken, (req, res) => {
    res.status(200).send({
        ok: true
    });
});

userRouter.get('/admin-pass', verifyToken, isAdmin, (req, res) => {
    res.status(200).send({
        ok: true
    });
})

 
module.exports = userRouter;