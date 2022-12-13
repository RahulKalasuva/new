const asyncHandler = require('express-async-handler')
const User =require('../models/userSchema')


const getTasks = asyncHandler(async (req, res) =>{
    res.status(200).json({"message": "Hello task"})
})
const setTask = asyncHandler(async (req, res) =>{
    res.status(200).json({"message": "Hello"})
})
const updateTask = asyncHandler(async (req, res) =>{
    res.status(200).json({"message": "Hello"})
})
const deleteTask = asyncHandler(async (req, res) =>{
    res.status(200).json({"message": "Hello"})
})

module.exports = {
                    getTasks,
                    setTask,
                    updateTask,
                    deleteTask,
                 }




