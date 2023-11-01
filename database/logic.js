const db = require('./db')

// Register logic
register = (acno, psw, uname) => {
    return db.User.findOne({ acno: acno }).then(user => {

        if (user) {
            return {
                message: 'User already exist',
                status: false,
                statusCode: 404
            }

        }
        else {
            // object of  user create

            newuser = new db.User({
                //input acno add
                acno: acno,
                uname: uname,
                psw: psw,
                balance: 0,
                transaction: []
            })
            //to reflect the changes done by the server in database
            newuser.save()
            return {
                message: "Registered successfully",
                status: true,
                statusCode: 200
            }
        }
    })

}


// login logic

login = (acno, psw) => {
    return db.User.findOne({ acno, psw }).then(user => {

        if (user) {
            return {
                message: "Login success",
                status: true,
                statusCode: 200,
                currentUser: user.uname,
                currentAcno: acno
            }
        } else {

            return {

                message: 'Incorrect acno and password ',
                status: false,
                statusCode: 404
            }
        }
    })




}

//getuser logic

getUser = (acno) => {
    return db.User.findOne({ acno }).then(user => {

        if (user) {

            return {
                message: user,
                status: true,
                statusCode: 200
            }


        } else {
            return {
                message: "user not exist",
                status: false,
                statusCode: 404
            }


        }


    })
}

// balance logic

getBalance = (acno) => {

    return db.User.findOne({ acno }).then(user => {


        if (user) {

            return {

                message: user.balance,
                status: true,
                statusCode: 200




            }

        }
        else {

            return {
                message: "user not exist",
                status: false,
                statusCode: 404


            }
        }



    })


}

//  logic for money transfer

moneyTransfer = (fromAcno, toAcno, amount, psw, date) => {
    return db.User.findOne({ acno: fromAcno, psw }).then(fromUser => {
        if (fromUser) {
            return db.User.findOne({ acno: toAcno }).then(toUser => {

                if (toUser) {
                    amount = parseInt(amount)
                    if (amount < fromUser.balance) {

                        fromUser.balance -= amount
                        fromUser.transaction.push({ type: 'DEBIT', amount, date })
                        fromUser.save()

                        toUser.balance += amount
                        toUser.transaction.push({ type: 'CREDIT', amount, date })
                        toUser.save()

                        return {
                            message: "Transaction success",
                            status: true,
                            statusCode: 200
                        }



                    } else {

                        return {
                            message: "InSufficient Balance",
                            status: false,
                            statusCode: 404
                        }
                    }


                } else {

                    // not to user


                    return {
                        message: "Invalid Credit Credentials",
                        status: false,
                        statusCode: 404
                    }

                }
            })


        } else {

            // not from user

            return {
                message: "Invalid Debit Credentials",
                status: false,
                statusCode: 404
            }
        }
    })
}

//to get transacton history
getTransaction = acno => {
    return db.User.findOne({ acno }).then(user => {
        if (user) {
            return {
                message: user.transaction,


                status: true,
                statusCode: 200
            }


        } else {

            return {
                message: "user not exist",
                status: "false",
                statusCode: 404
            }
        }
    })
}


module.exports = {
    register, login, getUser, getBalance, moneyTransfer, getTransaction
}

