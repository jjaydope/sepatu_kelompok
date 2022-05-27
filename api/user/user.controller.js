const {
    add,
    get,
    getId,
    update,
    del,
    serviceGetUserByUsername
} = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
module.exports = {
    controllerAdd: (req, res) => {
        user = {
            id_user: req.body.id_user,
            name: req.body.name,
            role: req.body.role,
            username: req.body.username,
            password: req.body.password
        }
        const salt = genSaltSync(10);
        user.password = hashSync(user.password, salt);
        add(user, (err, results) => {
            if (err) {
                console.log(err)
                return
            } else {
                return res.json({
                    success: 1,
                    data: results
                })

            }
        })
    },
    controllerGet: (req, res) => {
        get((err, results) => {
            if (err) {
                console.log(err)
                return
            } else {
                return res.json({
                    success: 1,
                    data: results
                })
            }
        })
    },
    controllerGetId: (req, res) => {
        const body = req.body.id_user
        getId(body, (err, results) => {
            if (err) {
                console.log(err)
                return
            } else {
                return res.json({
                    success: 1,
                    data: results
                })
            }
        })
    },
    controllerUpdate: (req, res) => {
        const user = {
            id_user: req.body.id_user,
            name: req.body.name,
            role: req.body.role,
            username: req.body.username
        }
        update(user, (err, results) => {
            if (err) {
                console.log(err)
                return

            } else if (!results) {
                return res.json({
                    success: 0,
                    message: "Not Found"
                })
            } else {
                return res.json({
                    success: 1,
                    data: results
                })
            }
        })
    },
    controllerDelete: (req, res) => {
        const body = req.body.id_user
        del(body, (err, results) => {
            if (err) {
                console.log(err)
                return
            } else if (!results) {
                return res.json({
                    success: 0,
                    message: "Not Found"
                })
            } else {
                return res.json({
                    success: 1,
                    message: "Delete Success"
                })
            }
        })
    },
    controllerLogin: (req, res) => {
        const body = req.body;
        serviceGetUserByUsername(body.username, (err, results) => {
            if (err) {
                console.log(err)
            } if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid username"
                })
            }

            const result = compareSync(body.password, results.password)
            console.log(result);
            console.log(results.password);
            console.log(body.password);
            if (result) {
                results.password = undefined
                const jsonwebtoken = sign({ result: results }, "secretkey", {
                    expiresIn: "1h"
                })
                return res.json({
                    success: 1,
                    message: "Login succesfuly, Your Acount Already Use",
                    account: results,
                    token: jsonwebtoken
                })
            } else {
                return res.json({
                    success: 0,
                    message: "Password invalid"
                })
            }
        })
    }
}