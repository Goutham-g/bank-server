//   import mongoose
const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/BankServer')

//model for collection  //schema - fields and values in model 

const User = mongoose.model('User', {
    acno: Number,
    uname: String,
    psw: String,
    balance: Number,
    transaction: []


})

//Export model

module.exports = {
    User
}