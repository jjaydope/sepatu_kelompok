const db = require('../../config/connection');
module.exports = {
    add: (data, callBack) => {

        db.query(`insert into user set ?`,
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
        db.query(`select * from user`,
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
        db.query(`select * from user where id_user = ?`,
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
        db.query(`select * from user where id_user=?`,
            [data.id_user],
            (err, results) => {
                if (err) {
                    return callBack(err)
                } else {
                    db.query(`update user set ? where id_user = ?`,
                        [
                            data,
                            data.id_user
                        ]);
                    return callBack(null, results[0])
                }
            })
    },
    del: (data, callBack) => {
        db.query(`select id_user from user where id_user = ?`,
            [data],
            (err, results) => {
                if (err) {
                    return callBack(err)
                } else {
                    db.query(`delete from user where id_user = ?`,
                        [data]);
                    return callBack(null, results[0])
                }

            })
    },
    serviceGetUserByUsername: (username, callBack) => {
        db.query(
            `select * from user where username=? `,
            [username], (err, results) => {
                if (err) {
                    return callBack(err)
                } else {
                    return callBack(null, results[0])
                }
            }
        )
    }

}