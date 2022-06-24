const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'static'});
const { executeMysql } = require('../utils/database');


/* 
    上传头像
    uploadAvatar
*/
router.post('/uploadAvatar', upload.single('avatar'), (request, response) => {
    const file = request.file;
    const fileTypeName = file.originalname.split('.')[1];
    fs.renameSync(file.path, 'static/' + (file.filename + '.' + fileTypeName));
    file.path = (file.filename + '.' + fileTypeName);
    console.log(file);
    response.send({
        code: 200,
        file
    });
});


/* 
    上传多个文件
    uploadFiles
*/
router.post('/uploadFileList', upload.array('files', 10), (request, response) => {
    const { id } = request.user
    const files = request.files;
    const fileList = [];

    // 先处理所有文件
    files.forEach(file => {
        const fileTypeName = file.originalname.split('.')[1];
        fs.renameSync(file.path, 'static/' + (file.filename + '.' + fileTypeName));
        file.path = (file.filename + '.' + fileTypeName);

        // 写入数据库
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


/* 
    删除单个文件
    deleteSingleFile
*/
router.delete('/deleteSingleFile', (request, response) => {
    const { name } = request.query;
    const sqlString = `DELETE FROM file WHERE name='${name}'`;
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


/* 
    删除全部文件
    deleteAllFile
*/
router.delete('/deleteAllFile', (request, response) => {
    const { ids } = request.query;
    let count = 0;
    ids.forEach(id => {
        const sqlString = `DELETE FROM file WHERE id=${id}`;
        executeMysql(sqlString)
        .then(() => {
            count++;
            if (count === ids.length) {
                response.send({
                    code: 200,
                    message: '删除成功'
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    });
});


/* 
    获取文件列表
    getFileList
*/
router.get('/getFileList', (request, response) => {
    const sqlString = `SELECT id, originalname, name, time FROM file`;
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


/* 
    获取我的上传列表
    getMyUploadList
*/
router.get('/getMyUploadList', (request, response) => {
    const { id } = request.user
    const sqlString = `SELECT id, originalname, name, time FROM file WHERE userId='${id}'`;
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