const mysql = require("mysql");
const { mysqlConfig } = require("./config");

// create database connection pool
const { connectionLimit, host, port, user, password, database } = mysqlConfig;
const pool = mysql.createPool({
  connectionLimit,
  host,
  port,
  user,
  password,
  database,
});

// mysql function
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
