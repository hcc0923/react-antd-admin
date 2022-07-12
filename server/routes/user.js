const express = require('express');
const router = express.Router();
const { executeMysql } = require('../utils/database');


// user list
router.get('/getUser', (request, response) => {
    const sqlString = `SELECT id
    FROM user`;

    executeMysql(sqlString)
        .then(result => {
            const { length: total } = result;
            const { query } = request;
            const { pageNum: queryPageNum, pageSize: queryPageSize } = query;
            let sqlString = `SELECT id,
                    username,
                    gender,
                    phone,
                    email,
                    time,
                    avatar
            FROM user
            WHERE 1 = 1`;

            Object.keys(query).forEach(key => {
                switch (key) {
                    case 'username':
                        if (query['username'] !== '') {
                            sqlString += ` AND username = '${query[key]}'`;
                        }
                        break;
                    case 'gender':
                        if (query['gender'] !== '-1') {
                            sqlString += ` AND gender = ${query[key]}`;
                        }
                        break;
                    case 'phone':
                        if (query['phone'] !== '') {
                            sqlString += ` AND phone = '${query[key]}'`;
                        }
                        break;
                    case 'email':
                        if (query['email'] !== '') {
                            sqlString += ` AND email = '${query[key]}'`;
                        }
                        break;
                    default:
                        break;
                }
            });

            if (queryPageNum && queryPageSize) {
                const pageNum = Number(queryPageNum);
                const pageSize = Number(queryPageSize);
                const n = (pageNum - 1) * pageSize;
                sqlString += ` LIMIT ${n}, ${pageSize}`;
            } 
            executeMysql(sqlString)
                .then(result => {
                    response.send({
                        code: 200,
                        message: '获取成功',
                        result,
                        total
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        })
        .catch(error => {
            console.log(error);
        });
});


// add user
router.post('/addUser', (request, response) => {
    const { username, gender, phone, email } = request.body;
    const sqlString = `SELECT id
    FROM user
    WHERE username='${username}'
            AND gender=${gender}
            AND phone='${phone}'
            AND email='${email}'`;

    executeMysql(sqlString)
        .then(result => {
            if (result.length === 0) {
                const sqlString = `INSERT INTO user (username, gender, phone, email) VALUES('${username}', ${gender}, '${phone}', '${email}')`;

                executeMysql(sqlString)
                    .then(result => {
                        if (result.affectedRows > 0) {
                            response.send({
                                code: 200,
                                message: '创建成功'
                            });
                        } else {
                            response.send({
                                message: '创建失败'
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
            } else {
                response.send({
                    message: '用户已存在'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
});


// update user
router.put('/editUser', (request, response) => {
    const { id, username, gender, phone, email, avatar } = request.body;
    const sqlString = `UPDATE user SET username='${username}', gender=${gender},phone='${phone}' ,email='${email}', avatar='${avatar}'
    WHERE id=${id}`;
    
    executeMysql(sqlString)
        .then(result => {
            if (result.affectedRows > 0) {
                response.send({
                    code: 200,
                    message: '编辑成功'
                });
            } else {
                response.send({
                    code: 200,
                    message: '编辑失败'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
});


// delete user
router.delete('/deleteUser', (request, response) => {
    const { id } = request.query;
    const sqlString = `DELETE
    FROM user
    WHERE id = ${id}`;

    executeMysql(sqlString)
        .then(result => {
            if (result.affectedRows > 0) {
                response.send({
                    code: 200,
                    message: '删除成功',
                });
            } else {
                response.send({
                    message: '删除失败'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
});


// multiple delete
router.delete('/multipleDelete', (request, response) => {
    const { ids } = request.query;
    let count = 0;

    ids.forEach(id => {
        const sqlString = `DELETE
        FROM user
        WHERE id = ${id}`;

        executeMysql(sqlString)
            .then(() => {
                count++;
                if (count === ids.length) {
                    response.send({
                        code: 200,
                        message: '删除成功',
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    });
});


// user detail
router.get('/getUserDetail/:id', (request, response) => {
    const { id } = request.params;
    const sqlString = `SELECT id,
        username,
        gender,
        phone,
        email,
        avatar,
        remark
    FROM user
    WHERE id=${id}`;

    executeMysql(sqlString)
        .then(result => {
            response.send({
                code: 200,
                message: '获取成功',
                result
            });
        })
        .catch(error => {
            console.log(error);
        });
});


// upload avatar
router.put('/uploadAvatar', (request, response) => {
    const { id, avatar } = request.body;
    const sqlString = `UPDATE user SET avatar='${avatar}'
    WHERE id=${id}`;

    executeMysql(sqlString)
        .then(result => {
            if (result.affectedRows > 0) {
                response.send({
                    code: 200,
                    message: '上传成功'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
});


// update user
router.put('/updateUser', (request, response) => {
    const { id, username, gender, phone, email, avatar, remark } = request.body;
    const sqlString = `UPDATE user SET username='${username}', gender=${gender}, phone='${phone}', email='${email}', avatar='${avatar}', remark='${remark}'
    WHERE id=${id}`;

    executeMysql(sqlString)
        .then(result => {
            if (result.affectedRows > 0) {
                response.send({
                    code: 200,
                    message: '修改成功'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
});


// verify password
router.get('/verifyPassword', (request, response) => {
    const { id } = request.auth;
    const { password } = request.query;
    const sqlString = `SELECT password
    FROM user
    WHERE id=${id}`;
    
    executeMysql(sqlString)
        .then(result => {
            if (result[0].password === password) {
                response.send({
                    code: 200,
                    message: '当前密码正确'
                });
            } else {
                response.send({
                    message: '当前密码错误'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
});


// update password
router.put('/updatePassword', (request, response) => {
    const { id } = request.auth;
    const { newPassword } = request.body;
    const sqlString = `UPDATE user SET password='${newPassword}'
    WHERE id=${id}`;

    executeMysql(sqlString)
        .then(result => {
            if (result.affectedRows > 0) {
                response.send({
                    code: 200,
                    message: '修改成功'
                });
            } else {
                response.send({
                    message: '修改失败'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
});


// get role
router.get('/getRole', (request, response) => {
    const sqlString = `SELECT id
    FROM user`;

    executeMysql(sqlString)
        .then((result) => {
            const { length: total } = result;
            const { query } = request;
            const { pageNum: queryPageNum, pageSize: queryPageSize } = query;
            let sqlString = `SELECT id,
                username,
                role
            FROM user
            WHERE 1 = 1`;

            Object.keys(query).forEach(key => {
                switch (key) {
                    case "id":
                        if (query["id"] !== '0') {
                            sqlString += ` AND id =  ${Number(query[key])}`;
                        }
                        break;
                    case "username":
                        if (query["username"] !== '') {
                            sqlString += ` AND username = '${query[key]}'`;
                        }
                        break;
                    case "role":
                        if (query["role"] !== '0') {
                            sqlString += ` AND role = ${Number(query[key])}`;
                        }
                        break;
                    default:
                        break;
                }
            });

            if (queryPageNum && queryPageSize) {
                const pageNum = Number(queryPageNum);
                const pageSize = Number(queryPageSize);
                const n = (pageNum - 1) * pageSize;
                sqlString += ` LIMIT ${n}, ${pageSize}`; 
            }
            executeMysql(sqlString)
                .then(result => {
                    // response.header('Cache-Control', 'max-age=31536000');
                    response.send({
                        code: 200,
                        message: '获取成功',
                        result,
                        total
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        })
        .catch(error => {
            console.log(error);
        });
});


// edit role
router.put('/editRole', (request, response) => {
    const { id, role } = request.body;
    const sqlString = `UPDATE user SET role = ${role}
    WHERE id=${id}`;

    executeMysql(sqlString)
        .then(result => {
            if (result.affectedRows > 0) {
                response.send({
                    code: 200,
                    message: '编辑成功'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
});

module.exports = router;