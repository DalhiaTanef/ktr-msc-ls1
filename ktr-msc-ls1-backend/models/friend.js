const mongoose = require("mongoose")

const FriendSchema = new mongoose.Schema({
    name: String,
    companyName: String,
    email: String,
    phoneNumber: String
})

module.exports.Friend = mongoose.model("Friend", FriendSchema);