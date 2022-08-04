const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const executeMysql = require("../utils/database");
const { emailAuthCode } = require("../utils/authCode");
const { secretKey } = require("../utils/config");

router.post("/userLogin", (request, response) => {
  const { email, password } = request.body;
  const sqlString = `SELECT id,
            username,
            role,
            avatar,
            last_login_time,
            last_login_ip
    FROM user
    WHERE email = '${email}'
            AND password = '${password}'`;

  executeMysql(sqlString)
    .then((result) => {
      if (result.length > 0) {
        const { id } = result[0];
        const user = Object.assign({}, result[0]);
        const token = jwt.sign(user, secretKey, {
          expiresIn: 60 * 60 * 12 * 24 * 7,
        });
        const sqlString = `UPDATE user SET last_login_time=CURRENT_TIMESTAMP,
                        last_login_ip='${request.ip}'
                WHERE id=${id}`;

        executeMysql(sqlString)
          .then(() => {
            response.send({
              code: 200,
              message: "登陆成功",
              token,
              userInfo: user,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        response.send({
          message: "邮箱或密码错误",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/userRegister", (request, response) => {
  const { email, password } = request.body;
  const sqlString = `SELECT id
    FROM user
    WHERE email='${email}'
            AND password='${password}'`;

  executeMysql(sqlString)
    .then((result) => {
      if (result.length > 0) {
        response.send({
          code: 200,
          message: "你已注册，请登录",
        });
      } else {
        const sqlString = `INSERT INTO user (email, password, gender) VALUES('${email}', '${password}', ${0})`;

        executeMysql(sqlString)
          .then((result) => {
            if (result.affectedRows > 0) {
              response.send({
                code: 200,
                message: "注册成功",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/findEmail", (request, response) => {
  const { email } = request.body;
  const sqlString = `SELECT id
    FROM user
    WHERE email ='${email}'`;

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

router.post("/sendEmail", (request, response) => {
  const { email } = request.body;
  const userAuthCode = emailAuthCode(email);

  response.send({
    code: 200,
    message: "发送成功",
    userAuthCode,
  });
});

router.put("/resetPassword", (request, response) => {
  const { email, password } = request.body;
  const sqlString = `UPDATE user SET password='${password}'
    WHERE email='${email}'`;

  executeMysql(sqlString)
    .then((result) => {
      if (result.affectedRows > 0) {
        response.send({
          code: 200,
          message: "重置成功",
        });
      } else {
        response.send({
          code: 200,
          message: "重置失败",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
