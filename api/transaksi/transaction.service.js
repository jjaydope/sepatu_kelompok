const db = require("../../config/connection");
module.exports = {
    add: (data, callBack) => {
        db.query(
            `select * from product where id_product = ?`,
            [data.id_product],
            (err, results) => {
                // console.log(!results[0]);
                // console.log(results[0].stock);
                // console.log(null);
                if (err) {
                    console.log(err);
                    return;
                } else if (!results[0]) {
                    return callBack("BNF");
                } else if (results[0].stock < 1) {
                    return callBack("Habis");
                } else {
                    db.query(
                        `select id_customer from customer where id_customer = ?`,
                        [data.id_customer],
                        (err, results) => {
                            if (err) {
                                console.log(err);
                                return;
                            } else if (!results[0]) {
                                return callBack("ANF");
                            } else {
                                db.query(
                                    `select id_user from user where id_user = ?`,
                                    [data.id_user],
                                    (err, results) => {
                                        if (err) {
                                            console.log(err);
                                            return;
                                        } else if (!results[0]) {
                                            return callBack("PNF");
                                        } else {
                                            db.query(

                                                `insert into transaction set ?`,
                                                [data],
                                                (err, results) => {
                                                    if (err) {
                                                        return callBack(err);
                                                    } else {
                                                        db.query(
                                                            `select * from product where id_product = ?`,

                                                            [data.id_product],
                                                            (err, results) => {
                                                                // console.log(!results[0]);
                                                                // console.log(results[0].stock);
                                                                // console.log(null);
                                                                if (err) {
                                                                    console.log(err);
                                                                    return;
                                                                } else {
                                                                    hasil = results[0].stock - 1;
                                                                    db.query(
                                                                        `update product set stock=? where id_product = ?`,
                                                                        [hasil, data.id_product]
                                                                    );
                                                                }
                                                            }
                                                        );
                                                    }

                                                    return callBack(null, results);

                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );
    },
    get: (callBack) => {
        db.query(`select * from transaction`, [], (err, results) => {
            if (err) {
                return callBack(err);
            } else {

                return callBack(null, results[0]);
            }
        });
    },
    getId: (data, callBack) => {
        db.query(
            `select * from transaction where id_transaction = ?`,
            [data],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, results[0]);
                }
            }
        );
    },
    update: (data, callBack) => {
        db.query(
            `select * from transaction where id_transaction=?`,
            [data.id_transaction],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else {
                    db.query(`update transaction set ? where id_transaction = ?`, [
                        data,
                        data.id_transaction,
                    ]);
                    return callBack(null, results[0]);
                }
            }
        );
    },
    del: (data, callBack) => {
        db.query(
            `select id_transaction from transaction where id_transaction = ?`,
            [data.id_transaction],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else {
                    db.query(
                        `delete from transaction where id_transaction = ?`,
                        [data.id_transaction],

                        (err, result) => {
                            if (err) {
                                return callBack(err);
                            } else {
                                db.query(
                                    `select * from product where id_product = ?`,
                                    [data.id_product],
                                    (err, results) => {
                                        // console.log(!results[0]);
                                        // console.log(results[0].stock);
                                        // console.log(null);
                                        if (err) {
                                            console.log(err);
                                            return callBack(err);
                                        } else {
                                            hasil = results[0].stock + 1;
                                            db.query(`update product set stock=? where id_product =?`,
                                                [
                                                    hasil,
                                                    data.id_product,
                                                ]);
                                        }
                                    }
                                );
                                return callBack(null, result[0]);
                            }
                        }
                    );
                }
            }
        );
    },
};