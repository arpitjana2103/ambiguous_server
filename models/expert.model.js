const mongoose = require("mongoose")

const expertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name field empty"]
    },
    image:{
        type:String,
        required: [true, "image field empty"]
    },
    age: {
        type: Number,
        required: [true, "age field empty"]
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female"],
            message: "incorrect gender"
        }
    },
    experience:{
        type:Number,
        require:[false]
    },
    email: {
        type: String,
        required: [true, "email field empty"]
    },
    password: {
        type: String,
        required: [true, "password field empty"]
    },
    specialisation:{
        type:String,
        enum:{
            values: ["MASSAGE","WAXING","FACIAL"],
            message: "incorrect specialisation"
        }
    }
}, {
    versionKey: false
})

const ExpertModel = mongoose.model("expert",expertSchema);

module.exports = {ExpertModel};