const express = require('express');
const {appointmentRouter} = require('./routes/appointmentRoute');
const {expertRouter} = require('./routes/expertRoute');
const {userRouter} = require('./routes/userRoute');

const app = express();

app.use(express.json());

app.use('/api/v1/appointments', appointmentRouter);
app.use('/api/v1/experts', expertRouter);
app.use('/api/v1/users', userRouter);

module.exports = {app};
