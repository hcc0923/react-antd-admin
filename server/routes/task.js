const express = require("express");
const router = express.Router();
const executeMysql = require("../utils/database");

router.post("/addTask", (request, response) => {
  const { taskname, tasklevel } = request.body;
  const sqlString = `SELECT id
    FROM task
    WHERE taskname='${taskname}'`;

  executeMysql(sqlString)
    .then((result) => {
      console.log(result);
      if (result.length === 0) {
        const sqlString = `INSERT INTO task (taskname, tasklevel) VALUES('${taskname}', ${tasklevel})`;

        executeMysql(sqlString)
          .then((result) => {
            if (result.affectedRows > 0) {
              response.send({
                code: 200,
                message: "创建成功",
              });
            } else {
              response.send({
                message: "创建失败",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        response.send({
          message: "任务已存在",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/deleteTask", (request, response) => {
  const { id } = request.body;
  const sqlString = `DELETE
    FROM task
    WHERE id = ${id}`;

  executeMysql(sqlString)
    .then((result) => {
      if (result.affectedRows > 0) {
        response.send({
          code: 200,
          message: "删除成功",
        });
      } else {
        response.send({
          message: "删除失败",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

router.put("/editTask", (request, response) => {
  const { id, taskname, tasklevel } = request.body;
  const sqlString = `UPDATE task SET taskname='${taskname}', tasklevel='${tasklevel}'
    WHERE id=${id}`;

  executeMysql(sqlString)
    .then((result) => {
      if (result.affectedRows > 0) {
        response.send({
          code: 200,
          message: "编辑成功",
        });
      } else {
        response.send({
          code: 200,
          message: "编辑失败",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/getTask", (request, response) => {
  const { body } = request;
  const { pageNum: queryPageNum, pageSize: queryPageSize } = body;
  let sqlString = `SELECT id,
                taskname,
                tasklevel
            FROM task
            WHERE 1 = 1`;
  Object.keys(body).forEach((key) => {
    switch (key) {
      case "id":
        if (body["id"] !== 0) {
          sqlString += ` AND id =  ${Number(body[key])}`;
        }
        break;
      case "taskname":
        if (body["taskname"] !== "") {
          sqlString += ` AND taskname = '${body[key]}'`;
        }
        break;
      case "tasklevel":
        if (body["tasklevel"] !== 0) {
          sqlString += ` AND tasklevel = ${Number(body[key])}`;
        }
        break;
      default:
        break;
    }
  });

  executeMysql(sqlString)
    .then((result) => {
      const { length: total } = result;
      if (queryPageNum && queryPageSize) {
        const pageNum = Number(queryPageNum);
        const pageSize = Number(queryPageSize);
        const n = (pageNum - 1) * pageSize;
        sqlString += ` LIMIT ${n}, ${pageSize}`;
      }
      executeMysql(sqlString)
        .then((result) => {
          // response.header('Cache-Control', 'max-age=31536000');
          response.send({
            code: 200,
            message: "获取成功",
            result,
            total,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
