const express = require('express');
const {UserModel} = require('../models/user.model');
const {blackListModel} = require('../models/blacklist.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userRouter = express.Router();

userRouter.post('/register', async function (req, res) {
    try {
        const {name, email, age, gender, password} = req.body;
        bcrypt.hash(password, 5, async function (err, hash) {
            if (!err) {
                const newUser = new UserModel({
                    name,
                    email,
                    age,
                    gender,
                    password: hash,
                });
                await newUser.save();

                return res.status(200).json({
                    status: 'ok',
                    message: 'A new user registered',
                    user: req.body,
                });
            } else {
                return res.status(400).json({
                    status: 'fial',
                    error: err.message,
                });
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            error: err.message,
        });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        if (!user) throw new Error('User not Found');
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.status(400).json({
                    status: 'fail',
                    error: err.message,
                });
            }

            if (result) {
                const aToken = jwt.sign(
                    {userID: user._id, userName: user.name},
                    'masaiA',
                    {
                        expiresIn: '1h',
                    }
                );
                return res.status(200).json({
                    status: 'ok',
                    message: 'Login Successfull',
                    accessToken: aToken,
                });
            }

            if (!result) {
                return res.status(200).json({
                    status: 'fail',
                    Error: 'Wrong Password',
                });
            }
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
});

userRouter.post('/logout', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        if (!token) throw new Error('Token not found !');
        const newToken = await new blackListModel({token});
        newToken.save();
        return res.status(200).json({
            status: 'ok',
            message: 'Logout Successfull',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
});

module.exports = {userRouter};
