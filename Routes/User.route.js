const express = require("express");
const { User } = require("../Models/User.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const userRouter = express.Router();

userRouter.get("/", async(req,res) =>{
    const user = await User.find()
    res.send(user)
})



///Registering the user

userRouter.post("/signup" ,async (req,res) => {

    const { Username, email} = req.body;


  try {

    // Create a new user
    const user = new User({
      Username,
      email,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Failed to signup', err);
    res.status(500).json({ error: 'Failed to signup' });
  }
     
})

///Login the user


userRouter.post("/login", async (req,res) => {
    const { email } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ email: user.email }, 'secret_key');
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      console.error('Failed to login', err);
      res.status(500).json({ error: 'Failed to login' });
    }
})




module.exports = {
    userRouter
}

