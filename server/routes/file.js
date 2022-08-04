const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'static'});
const { executeMysql } = require('../utils/database');


// upload avatar
router.post('/uploadAvatar', upload.single('avatar'), (request, response) => {
    const file = request.file;
    const fileTypeName = file.originalname.split('.')[1];
    fs.renameSync(file.path, 'static/' + (file.filename + '.' + fileTypeName));
    file.path = (file.filename + '.' + fileTypeName);

    response.send({
        code: 200,
        file
    });
});


// upload files
router.post('/uploadMultipleFile', upload.array('files', 10), (request, response) => {
    const { id } = request.auth
    const files = request.files;
    const fileList = [];

    // resolve all files
    files.forEach(file => {
        const fileTypeName = file.originalname.split('.')[1];
        fs.renameSync(file.path, 'static/' + (file.filename + '.' + fileTypeName));
        file.path = (file.filename + '.' + fileTypeName);

        // write to database 
        let count = 0;
        const sqlString = `INSERT INTO file (originalname, name, userId) VALUES('${file.originalname}', '${file.path}', '${id}')`;
        executeMysql(sqlString)
            .then(() => {
                count++;
                fileList.push(file);
                if (fileList.length === count) {
                    response.send({
                        code: 200,
                        fileList
                    });
                };
            })
            .catch(error => {
                console.log(error);
            });
    });
});


// delete file
router.delete('/deleteSingleFile', (request, response) => {
    const { id, name } = request.body;
    const sqlString = `DELETE
    FROM file
    WHERE id='${id}'`;

    executeMysql(sqlString)
        .then(() => {
            fs.unlink(`static/${name}`, error => {
                if (error) {
                    response.send({
                        message: '删除失败'
                    });
                } else {
                    response.send({
                        code: 200,
                        message: '删除成功'
                    });
                };
            });
        })
        .catch(error => {
            console.log(error);
        });
});


// delete all files
router.delete('/deleteAllFile', (request, response) => {
    const { deleteParams } = request.body;
    let count = 0;

    deleteParams.forEach(item => {
        const sqlString = `DELETE
        FROM file
        WHERE id=${item.id}`;

        executeMysql(sqlString)
            .then(() => {
                fs.unlink(`static/${item.name}`, error => {
                    if (error) {
                        response.send({
                            message: '删除失败'
                        });
                    } else {
                        count++;
                        if (count === deleteParams.length) {
                            response.send({
                                code: 200,
                                message: '删除成功'
                            });
                        }
                    };
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
});


// get file list
router.get('/getFileList', (request, response) => {
    const sqlString = `SELECT id,
         originalname,
         name,
         time
    FROM file`;

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


// my upload file list
router.get('/getMyUploadList', (request, response) => {
    const { id } = request.auth
    const sqlString = `SELECT id,
         originalname,
         name,
         time
    FROM file
    WHERE userId='${id}'`;
    
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

module.exports = router;