const serverConfig = {
  port: 3001,
};

const corsConfig = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
  credentials: true,
};

const mysqlConfig = {
  connectionLimit: 10,
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "123456",
  database: "user",
};

const secretKey = "key";

const whiteList = [
  "/login/userLogin",
  "/login/userRegister",
  "/login/findEmail",
  "/login/sendEmail",
  "/login/resetPassword",
  "/file/uploadAvatar",
  "/file/uploadFiles",
];

const emailConfig = {
  neteaseConfig: {
    service: "smtp.163.com",
    host: "smtp.163.com",
    secure: true,
    port: 465,
    auth: {
      user: "15657122362@163.com",
      pass: "GXGDVPAWNTITQWTZ",
    },
  },
  secretKey: "emailSecretKey",
};

module.exports = {
  serverConfig,
  corsConfig,
  mysqlConfig,
  secretKey,
  whiteList,
  emailConfig,
};
