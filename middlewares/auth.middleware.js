const jwt = require('jsonwebtoken');
require('dotenv').config();
const {blackListModel} = require('../models/blacklist.model');

const userAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const exist = await blackListModel.findOne({token});
    try {
        if (!token) throw new Error('Provide the token Please');
        if (exist) throw new Error('Please Login !');
        jwt.verify(token, 'masaiA', function (err, decoded) {
            if (err) {
                return res.status(400).json({
                    status: 'fail',
                    error: err.message,
                });
            }

            if (decoded) {
                req.body.userID = decoded.userID;
                req.body.email = decoded.email;
                next();
            }
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const expertAuth = async (req, res, next) => {
    // let str = req.headers.authorization;
    // str = str.split(' ');
    // let token = str[1];
    // if (token) {
    //     try {
    //         const decoded = jwt.verify(token, process.env.token);
    //         let blacktoken = await client.get(
    //             `${decoded.email}expertblacktoken`
    //         );
    //         if (blacktoken === token) {
    //             return res.status(400).send({
    //                 isError: true,
    //                 error: "you're logged out please login first",
    //             });
    //         }
    //         req.body.expertID = decoded.expertID;
    //         next();
    //     } catch (error) {
    //         return res.status(400).send({
    //             isError: true,
    //             error: 'token not valid',
    //         });
    //     }
    // } else {
    //     return res.status(400).send({
    //         isError: true,
    //         error: 'please login first',
    //     });
    // }
};

module.exports = {userAuth, expertAuth};
