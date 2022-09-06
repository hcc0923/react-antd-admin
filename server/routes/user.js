const express = require("express");
const router = express.Router();
const executeMysql = require("../utils/database");

router.post("/getUser", (request, response) => {
  const { body } = request;
  const { pageNum: queryPageNum, pageSize: queryPageSize } = body;
  let sqlString = `SELECT id,
                    username,
                    gender,
                    role,
                    phone,
                    email,
                    time,
                    avatar
            FROM user
            WHERE 1 = 1`;

  Object.keys(body).forEach((key) => {
    switch (key) {
      case "username":
        if (body["username"] !== "") {
          sqlString += ` AND username = '${body[key]}'`;
        }
        break;
      case "gender":
        if (body["gender"] !== -1) {
          sqlString += ` AND gender = ${body[key]}`;
        }
        break;
      case "role":
        if (body["role"] !== 0) {
          sqlString += ` AND role = ${body[key]}`;
        }
        break;
      case "phone":
        if (body["phone"] !== "") {
          sqlString += ` AND phone = '${body[key]}'`;
        }
        break;
      case "email":
        if (body["email"] !== "") {
          sqlString += ` AND email = '${body[key]}'`;
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

router.post("/addUser", (request, response) => {
  const { username, gender, role, phone, email, avatar } = request.body;
  const sqlString = `SELECT id
    FROM user
    WHERE email='${email}'`;

  executeMysql(sqlString)
    .then((result) => {
      console.log(result);
      if (result.length === 0) {
        const sqlString = `INSERT INTO user (username, gender, role, phone, email, avatar) VALUES('${username}', ${gender}, ${role}, '${phone}', '${email}', '${avatar}')`;

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
          message: "用户已存在",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

router.put("/editUser", (request, response) => {
  const { id, username, gender, role, phone, email, avatar } = request.body;
  const sqlString = `UPDATE user SET username='${username}', gender=${gender}, role=${role}, phone='${phone}', email='${email}', avatar='${avatar}'
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

router.delete("/deleteUser", (request, response) => {
  const { id } = request.body;
  const sqlString = `DELETE
    FROM user
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

router.delete("/multipleDelete", (request, response) => {
  const { ids } = request.body;
  let count = 0;

  ids.forEach((id) => {
    const sqlString = `DELETE
        FROM user
        WHERE id = ${id}`;

    executeMysql(sqlString)
      .then(() => {
        count++;
        if (count === ids.length) {
          response.send({
            code: 200,
            message: "删除成功",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

router.get("/getUserDetail/:id", (request, response) => {
  const { id } = request.params;
  const sqlString = `SELECT id,
        username,
        gender,
        role,
        phone,
        email,
        avatar,
        remark
    FROM user
    WHERE id=${id}`;

  executeMysql(sqlString)
    .then((result) => {
      response.send({
        code: 200,
        message: "获取成功",
        result,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.put("/uploadAvatar", (request, response) => {
  const { id, avatar } = request.body;
  const sqlString = `UPDATE user SET avatar='${avatar}'
    WHERE id=${id}`;

  executeMysql(sqlString)
    .then((result) => {
      if (result.affectedRows > 0) {
        response.send({
          code: 200,
          message: "上传成功",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

router.put("/updateUser", (request, response) => {
  const { id, username, gender, role, phone, email, avatar, remark } =
    request.body;
  const sqlString = `UPDATE user SET username='${username}', gender=${gender}, role=${role}, phone='${phone}', email='${email}', avatar='${avatar}', remark='${remark}'
    WHERE id=${id}`;

  executeMysql(sqlString)
    .then((result) => {
      if (result.affectedRows > 0) {
        response.send({
          code: 200,
          message: "修改成功",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/checkPassword", (request, response) => {
  const { id } = request.auth;
  const { password } = request.body;
  const sqlString = `SELECT password
    FROM user
    WHERE id=${id}`;

  executeMysql(sqlString)
    .then((result) => {
      if (result[0].password === password) {
        response.send({
          code: 200,
          message: "当前密码正确",
        });
      } else {
        response.send({
          message: "当前密码错误",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

router.put("/updatePassword", (request, response) => {
  const { id } = request.auth;
  const { newPassword } = request.body;
  const sqlString = `UPDATE user SET password='${newPassword}'
    WHERE id=${id}`;

  executeMysql(sqlString)
    .then((result) => {
      if (result.affectedRows > 0) {
        response.send({
          code: 200,
          message: "修改成功",
        });
      } else {
        response.send({
          message: "修改失败",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
