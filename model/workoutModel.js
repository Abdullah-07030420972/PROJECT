

const mongoose = require("mongoose")

const workoutSchema = new mongoose.Schema({
  
  workoutName: {type: String, require: true},
  
  exercises: {type: String, require: true},
  
  duration: {type: Number}
})
const workout = new mongoose.model("workout", workoutSchema)

module.exports = workout