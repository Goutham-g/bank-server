// import express
const express = require("express")
// import cors

const cors = require('cors')

//import logic file
const logic = require("./database/logic")

//server creation
const server = express()

// incoming json type data convert to js
server.use(express.json())

// connect front end ussing cors
server.use(cors({ orgin: 'http://localhost:4200' }))

// set port

server.listen(3000, () => {
    console.log('---Server started at port 3000---');
})


// register - post


server.post("/register", (req, res) => {
    logic.register(req.body.acno, req.body.psw, req.body.uname).then(result => {
        res.status(result.statusCode).json(result) //convert js to json and send as response
    })
})


// login post
server.post('/login', (req, res) => {
    logic.login(req.body.acno, req.body.psw).then(result1 => {
        res.status(result1.statusCode).json(result1)
    })
})

//get user data -get
server.get('/getuser/:acno', (req, res) => {
    logic.getUser(req.params.acno).then(result => {
        res.status(result.statusCode).json(result)
    })

})


//balance - get

server.get('/getbal/:acno', (req, res) => {
    logic.getBalance(req.params.acno).then(result => {

        res.status(result.statusCode).json(result)
    })

})


//transfer - post

server.post('/transfer', (req, res) => {
    logic.moneyTransfer(
        req.body.fromAcno, req.body.toAcno, req.body.amount, req.body.psw, req.body.date
    ).then(result => {
        res.status(result.statusCode).json(result)
    })

})




//transaction history - get
server.get('/resumehistory/:acno', (req, res) => {
    logic.getTransaction(req.params.acno).then(result => {
        res.status(result.statusCode).json(result)
    })


})

//ac delete



































//  server api resolve
// server.post('/getexc', (req, res) => {
//     res.send('.....post request...')
// })

// // // get request

// server.get('/getexc1', (req, res) => {
//     res.send('.....get  request...')
// })

