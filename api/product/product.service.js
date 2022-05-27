const db = require('../../config/connection');
module.exports = {
    add: (data, callBack) => {
        db.query(`insert into product set ?`,
            [data],
            (err, results) => {
                if (err) {
                    return callBack(err)
                } else {
                    return callBack(null, results)
                }
            })
    },

    get: (callBack) => {
        db.query(`select * from product`,
            [],
            (err, results) => {
                if (err) {
                    return callBack(err)
                } else {
                    return callBack(null, results)
                }
            })
    },
    getId: (data, callBack) => {
        db.query(`select * from product where id_product = ?`,
            [data],
            (err, results) => {
                if (err) {
                    return callBack(err)
                } else {
                    return callBack(null, results)
                }
            })
    },
    update: (data, callBack) => {
        db.query(`select * from product where id_product=?`,
            [data.id_product],
            (err, results) => {
                if (err) {
                    return callBack(err)
                } else {
                    db.query(`update product set ? where id_product = ?`,
                        [
                            data,
                            data.id_product
                        ]);
                    return callBack(null, results[0])
                }
            })
    },
    del: (data, callBack) => {
        db.query(`select id_product from product where id_product = ?`,
            [data],
            (err, results) => {
                if (err) {
                    return callBack(err)
                } else {
                    db.query(`delete from product where id_product = ?`,
                        [data]);
                    return callBack(null, results[0])
                }
            })
    }
}