const {
    add,
    get,
    getId,
    update,
    del
} = require('./customer.service')

module.exports = {
    controllerAdd: (req, res) => {
        const data_customer = {
            id_customer: req.body.id_customer,
            name: req.body.name,
            address: req.body.address,
            contact: req.body.contact,
            email: req.body.email
        }
        add(data_customer, (err, results) => {
            if (err) {
                console.log(err);
                return
            } else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                    data_customer
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
        const body = req.body.id_customer
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
        const data_customer = {
            id_customer: req.body.id_customer,
            name: req.body.name,
            address: req.body.address,
            contact: req.body.contact,
            email: req.body.email
        }
        update(data_customer, (err, results) => {
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
        const body = req.body.id_customer
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
    }
}