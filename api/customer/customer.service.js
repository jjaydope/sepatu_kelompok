const db = require('../../config/connection');
module.exports = {
    add: (data, callBack) => {
        db.query(`insert into customer set ?`,
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
        db.query(`select * from customer`,
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
        db.query(`select * from customer where id_customer = ?`,
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
        db.query(`select * from customer where id_customer=?`,
            [data.id_customer],
            (err, results) => {
                if (err) {
                    return callBack(err)
                } else {
                    db.query(`update customer set ? where id_customer = ?`,
                        [
                            data,
                            data.id_customer
                        ]);
                    return callBack(null, results[0])
                }
            })
    },
    del: (data, callBack) => {
        db.query(`select id_customer from customer where id_customer = ?`,
            [data],
            (err, results) => {
                if (err) {
                    return callBack(err)
                } else {
                    db.query(`delete from customer where id_customer = ?`,
                        [data]);
                    return callBack(null, results[0])
                }
            })
    }
}