const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    companyName: String,
    email: {type: String, unique: true},
    phoneNumber: String,
    password: String,
    cards: [{
        type: String,
        ref: "Friend"
    }]
})

module.exports.User = mongoose.model("User", UserSchema);