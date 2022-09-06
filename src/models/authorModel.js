const mongoose = require("mongoose")

function isValidEmail(email) {
    var isValid = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return isValid.test(email);
}


const authorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        enum: ["Mr", "Mrs", "Miss"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: [isValidEmail, "Enter a valid Email"]
    },
    password: {
        type: String,
        required: true,
        trim: true
    }

}, { timestamps: true })//


module.exports = mongoose.model('Author', authorSchema) //authors