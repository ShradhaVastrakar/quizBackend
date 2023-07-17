const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    Username:String,
    email:String,
})

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}