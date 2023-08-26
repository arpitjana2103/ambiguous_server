const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const appointmentSchema = new Schema(
    {
        userID: {
            type: String,
            required: true,
        },
        expertID: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
            required: true,
        },
        slot: {
            type: String,
            enum: {
                values: ['10-12', '13-15', '16-18'],
                message: 'enter correct slot',
            },
            required: true,
        },
        status: {
            type: String,
            enum: {
                values: ['pending', 'confirm', 'cancel'],
                message: ['incorrect status'],
            },
            default: 'pending',
        },
        userDetails: {
            type: Schema.Types.Mixed,
            required: true,
        },
        expertDetails: {
            type: Schema.Types.Mixed,
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

const AppointmentModel = mongoose.model('appointment', appointmentSchema);

module.exports = {AppointmentModel};
