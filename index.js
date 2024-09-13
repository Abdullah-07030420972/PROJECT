
const express = require('express')
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("./model/userModels")
const exercises = require("./model/exercisesModel")
const mealPlan = require("./model/mealPlanModel")
const workout = require('./model/workoutModel')
const { validateRegistration, validateLogin, validEmail} = require("./Middleware/validations")

const app = express()

app.use(express.json())


const PORT = process.env.PORT || 8000

mongoose.connect(`${process.env.MONGODB_URL}`)
.then(()=> console.log("MongoDB Connected sucessfully"))

app.listen(PORT, ()=>{
  console.log(`server active on PORT ${PORT}`)
})


app.post("/register", validateRegistration, async(request, response)=>{
  try {

    const { name, email, password, age, gender, fitnessGoals } = request.body

    const hashedpassword = await bcrypt.hash(password, 8)

    const newUser = new User({name, email, password:hashedpassword, age, gender, fitnessGoals})
    await newUser.save()
  
    return response.status(200).json({message: "Registration Sucessful", user: newUser})

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
})


app.post("/login", validateLogin, async(request, response)=>{
  try {

    const { email, password } = request.body

    const user = await User.findOne({email})

    if(!user){
      return response.status(400).json({message: "User Account does not Exit"})
    }

    const isMatched = bcrypt.compare(User.password, password)

    if(!isMatched){
      return response.status(400).json({message: "Invalid Email or Password"})
    }

    const accessToken = jwt.sign(user.email, `${process.env.ACCESS_TOKEN}`, {expiresIn: "90m"})


    return response.status(200).json({
      message:"Login Successful",
      accessToken,
      user,
    })

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
})

//CREATE A WORKOUT
app.post("/createWorkout", async(request, response)=>{
try {
  
  const {workoutName, exercises, duration} = request.body

  const workout = new workout({workoutName, exercises, duration})
  await workout.save()

  return response.status(200).json({message: "Workout Created Successfull"})
  
} catch (error) {
  return response.status(500).json({ message: error.message })
}
})

// EDIT USERS DETAILS
app.put("/edit-user/:id", async(request, response)=>{

  try {
    const { id } = request.params

  const {email, name, fitnessGoals} = request.body

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {email, name, fitnessGoals},
    {new: true}
  )

  return response.status(200).json({message: "Sucessful", user: updatedUser})

  } catch (error) {
    return resonse.status(500).json({ message: error.message })    
  }
})

//DELETE WORKOUT
app.delete("/deleteWorkout/:id", async (request, response)=>{
  try {
    const { id } = request.params

    const deletedWorkout = await workout.findByIdAndDelete(id)

    return response.status(200).json({message: "Successfully deleted "})

  } catch (error) {
    return resonse.status(500).json({ message: error.message })
  }
})

app.use((request, response)=>{
  return response.status(404).json({message: "Page does not exist!"})
})