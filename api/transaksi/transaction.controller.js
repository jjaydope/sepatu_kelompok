const { add, get, getId, update, del } = require("./transaction.service");
module.exports = {
    controllerAdd: (req, res) => {
        var now = new Date();
        var jsonDate = now.toJSON();
        var then = new Date(jsonDate);
        // console.log(now);
        now.getFullYear(),
            now.getMonth(),
            then.getDate(),
            now.getHours(),
            now.getMinutes(),
            now.getSeconds()
            ;
        // console.log(kembali);
        // console.log(now.getUTCDate());
        data_transaction = {
            id_transaction: req.body.id_transaction,
            id_product: req.body.id_product,
            id_customer: req.body.id_customer,
            date: then,
            payment: req.body.payment,
            status: req.body.status,
            id_user: req.body.id_user,

        };
        // console.log(data_pinjam);
        add(data_transaction, (err, results) => {
            if (err) {
                if (err === "CFP") {
                    // console.log("tidak ada");
                    return res.json({
                        message: "Cant Found Product",
                    });
                }
                if (err === "SO") {
                    // console.log("tidak ada");
                    return res.json({
                        message: "Sold Out",
                    });
                }
                if (err === "ANF") {
                    // console.log("tidak ada");
                    return res.json({
                        message: "Customer Not Found",
                    });
                }
                if (err === "PNF") {
                    // console.log("tidak ada");
                    return res.json({
                        message: "User Not Found",
                    });
                }
                console.log(err);

                return;
            } else {
                return res.json({
                    success: 1,
                    data: results,
                });
            }
        });
    },
    controllerGet: (req, res) => {
        get((err, results) => {
            if (err) {
                console.log(err);
                return;

            } else {
                return res.json({
                    succes: 1,
                    data: results,
                });
            }
        });
    },
    controllerGetId: (req, res) => {
        const body = req.body.id_transaction;
        getId(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            } else if (!results) {
                return res.json({
                    success: 0,
                    message: "Not Found",
                });
            } else {
                return res.json({
                    success: 1,
                    data: results,
                });
            }
        });
    },
    controllerUpdate: (req, res) => {

        const data_transaction = {
            id_transaction: req.body.id_transaction,
            customer_nm: req.body.customer_nm,
            role: req.body.role,
            email: req.body.email,
        };
        update(data_transaction, (err, results) => {
            if (err) {
                console.log(err);
                return;
            } else if (!results) {
                return res.json({
                    success: 0,
                    message: "Not Found",
                });
            } else {
                return res.json({
                    success: 1,
                    data: results,
                });
            }
        });
    },
    controllerDelete: (req, res) => {
        const body = {
            id_transaction: req.body.id_transaction,
            // stok: req.body.stok,
            id_product: req.body.id_product,
        };
        del(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            } else if (!results) {
                return res.json({
                    success: 0,
                    message: "Not Found",
                });
            } else {
                return res.json({
                    success: 1,
                    message: "Delete Success",
                });

            }
        });
    },
};
