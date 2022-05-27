const {
    add,
    get,
    getId,
    update,
    del
} = require('./product.service')

module.exports = {
    controllerAdd: (req, res) => {
        const data_product = {
            id_product: req.body.id_product,
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock
        }
        add(data_product, (err, results) => {
            if (err) {
                console.log(err);
                return
            } else {
                return res.status(200).json({
                    success: 1,
                    data: results,
                    data_product
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
        const body = req.body.id_product
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
        const data_product = {
            id_product: req.body.id_product,
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock
        }
        update(data_product, (err, results) => {
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
        const body = req.body.id_product
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