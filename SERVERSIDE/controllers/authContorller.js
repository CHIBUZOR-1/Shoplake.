const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');


const userRegisteration = async (req, res) => {
    try {
        const { name, lastname, phoneNumber, email, answer, password } = req.body;
        if(!name) {
            return res.send({error: "name is required"});
        }
        if(!lastname) {
            return res.send({error: "lastname is required"});
        }
        if(!phoneNumber) {
            return res.send({error: "number is required"});
        }
        if(!email) {
            return res.send({error: "email is required"});
        }
        if(!answer) {
            return res.send({error: "answer is required"});
        }
        if(!password) {
            return res.send({error: "password is required"});
        }

        const exists = await userModel.findOne({email});
        if(exists) {
            return res.json({
                success: false,
                message: "Email already in use"
            })
        }
        // validating email format & password
        if(!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Enter a valid Email Address"
            })
        }

        if(password.length < 6) {
            return res.json({
                success: false,
                message: "Please enter a strong password"
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, `${salt}`);
        const newUser = await new userModel({
            name,
            lastname,
            phoneNumber,
            email,
            answer,
            password: `${hashedPassword}`
        }).save();
        res.status(201).json({
            success: true,
            error: false,
            message: "User registered sucessfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: true,
            message: "Registration Error"
        })
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email) {
            return res.send({error: "email required"})
        }
        if(!password) {
            return res.send({error: "Input password"})
        }
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        } 
        const matchedPassword = await bcrypt.compare(password, user.password);
        if(!matchedPassword) {
            return res.json({
                success: false,
                message: "Invalid password"
            });
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "5h"});
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                role: user.admin,
                lastname: user.lastname,
                phoneNumber: user.phoneNumber
            },
            token
        })



    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Login Unsuccessful"
        })
        
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if(!email) {
            return res.send({error: "email required"});
        }
        if(!answer) {
            return res.send({error: "answer required"});
        }
        if(!newPassword) {
            return res.send({error: "Password required"});
        }
        const user = await userModel.findOne({email, answer});
        if(!user) {
            return res.json({
                success: false,
                message: "Wrong Email or Answer"
            })
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, `${salt}`);

        await userModel.findByIdAndUpdate(user._id, {password: hashedPassword});
        res.status(200).json({
            success: true,
            message: "Password Reset Successfully"
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            error: true,
            message: "Something went wrong!"
        })
    }
}

const allUsers = async (req, res) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const users = await userModel.find({}).select('-password').sort({UpdatedAt: -1}).skip(startIndex).limit(limit);
        const totalUsers = await userModel.countDocuments({});
        const now = new Date();
        const oneMonthAgo= new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthUsers = await userModel.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });
        res.status(200).json({
            success: true,
            message: "Retrieved Users Successfully",
            data: users,
            totalUsers,
            lastMonthUsers
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error retrieving Users list"
        })
    }
}

const updateUserRole = async (req, res) => {
    try {
        const { newAdmin } = req.body;
        if(!newAdmin) {
            return res.send({error: "role required"});
        }
        const roleUpdated = await userModel.findByIdAndUpdate(req.params.id, {admin: newAdmin}, {new: true});
        if(roleUpdated) {
            res.json({
                success: true,
                message: "Role update successful"
            })
        } else {
            res.json({
                success: false,
                message: "Unable to update"
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            error: true,
            message: "Error occured"
        })
    }
}

const testController = (req, res) => {
    res.send('awesome');
}


module.exports = { userRegisteration, userLogin, forgotPassword, testController, updateUserRole, allUsers };

