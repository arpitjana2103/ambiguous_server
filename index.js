const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.configDotenv({path: './config.env'});
const {app} = require('./app');

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT_NUM;

const server = app.listen(PORT, function () {
    console.log(`server is running on PORT ${PORT}`);
    console.log('Wait for Database connection...');
});

mongoose
    .connect(DB_URL)
    .then(function () {
        console.log('DataBase Connection Successfull.');
    })
    .catch(function (err) {
        console.log('Error in DB Connection');
        server.close(function () {
            console.log('SHUTTING DOWN THE SERVER...');
            process.exit(1);
        });
    });
