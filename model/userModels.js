
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    Name: {type: String,},

    email: {type: String, require: true},
    
    password: {type: String, require: true},
    
    age: {type: Number, require: true},
    
    gender: {type: String, require: true},
    
    fitnessGoals: {type: String, require: true}
}, {
    timestamps: true
})

const User = new mongoose.model("User", userSchema)
module.exports = User