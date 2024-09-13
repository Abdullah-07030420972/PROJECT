
const mongoose = require("mongoose")

const exercisesSchema = new mongoose.Schema({
  name: {type: String, require: true},

  type: {type: String, require: true},
  
  duration: {type: Number},
  
  caloriesBurned: {type: Number}
})
const exercises = new mongoose.model("exercises", exercisesSchema)

module.exports = exercises