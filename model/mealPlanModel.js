
const mongoose = require("mongoose")

const mealPlanSchema = new mongoose.Schema({
 
  mealName: {type: String, require: true},
 
  ingredients: {type: String, require: true},
 
  nutritionalInfo:{
 
    calories: {type: String, require: true},
 
    protein: {type: String, require: true},
 
    carbs: {type: String, require: true},
 
    fats: {type: String, require: true},
  }
})
const mealPlan = new mongoose.model("mealPlan", mealPlanSchema)

module.exports = mealPlan