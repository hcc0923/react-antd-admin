const mysql = require("mysql");
const { mysqlConfig } = require("./config");

const { connectionLimit, host, port, user, password, database } = mysqlConfig;
const pool = mysql.createPool({
  connectionLimit,
  host,
  port,
  user,
  password,
  database,
});

function executeMysql(sql) {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
      }
      connection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
        connection.release();
      });
    });
  });
}

module.exports = executeMysql;
