const express = require('express');
const router = express.Router();
const { executeMysql } = require('../utils/database');


// user list
router.post('/getUser', (request, response) => {
    const sqlString = `SELECT id
    FROM user`;

    executeMysql(sqlString)
        .then(result => {
            const { length: total } = result;
            const { body } = request;
           
            const { pageNum: queryPageNum, pageSize: queryPageSize } = body;
            let sqlString = `SELECT id,
                    username,
                    gender,
                    phone,
                    email,
                    time,
                    avatar
            FROM user
            WHERE 1 = 1`;

            Object.keys(body).forEach(key => {
                switch (key) {
                    case 'username':
                        if (body['username'] !== '') {
                            sqlString += ` AND username = '${body[key]}'`;
                        }
                        break;
                    case 'gender':
                        if (body['gender'] !== -1) {
                            sqlString += ` AND gender = ${body[key]}`;
                        }
                        break;
                    case 'phone':
                        if (body['phone'] !== '') {
                            sqlString += ` AND phone = '${body[key]}'`;
                        }
                        break;
                    case 'email':
                        if (body['email'] !== '') {
                            sqlString += ` AND email = '${body[key]}'`;
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
    const { username, gender, phone, email, avatar } = request.body;
    const sqlString = `SELECT id
    FROM user
    WHERE email='${email}'`;

    executeMysql(sqlString)
        .then(result => {
            console.log(result);
            if (result.length === 0) {
                const sqlString = `INSERT INTO user (username, gender, phone, email, avatar) VALUES('${username}', ${gender}, '${phone}', '${email}', '${avatar}')`;

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
    const { id } = request.body;
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
    const { ids } = request.body;
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


// check password
router.post('/checkPassword', (request, response) => {
    const { id } = request.auth;
    const { password } = request.body;
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
router.post('/getRole', (request, response) => {
    const sqlString = `SELECT id
    FROM user`;

    executeMysql(sqlString)
        .then((result) => {
            const { length: total } = result;
            const { body } = request;
            const { pageNum: queryPageNum, pageSize: queryPageSize } = body;
            let sqlString = `SELECT id,
                username,
                role
            FROM user
            WHERE 1 = 1`;
            Object.keys(body).forEach(key => {
                switch (key) {
                    case "id":
                        if (body["id"] !== 0) {
                            sqlString += ` AND id =  ${Number(body[key])}`;
                        }
                        break;
                    case "username":
                        if (body["username"] !== '') {
                            sqlString += ` AND username = '${body[key]}'`;
                        }
                        break;
                    case "role":
                        if (body["role"] !== 0) {
                            sqlString += ` AND role = ${Number(body[key])}`;
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