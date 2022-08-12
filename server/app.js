const express = require("express");
const path = require("path");
const fs = require("fs");
const favicon = require("serve-favicon");
const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { expressjwt } = require("express-jwt");

const {
  serverConfig,
  corsConfig,
  secretKey,
  whiteList,
} = require("./utils/config");

const {
  loginRouter,
  taskRouter,
  userRouter,
  fileRouter,
} = require("./routes/router");

const app = express();

app
  .use(favicon(path.join(__dirname, "static", "favicon.ico")))
  .use(compression())
  .use(cors(corsConfig))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(express.static(__dirname + "/static"))
  // .use(morgan('combined', {stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })}))
  .use(morgan(":method :url :status :res[content-length] - :response-time ms"))
  .use(
    expressjwt({
      secret: secretKey,
      algorithms: ["HS256"],
    }).unless({
      path: whiteList,
    })
  )
  .use((error, request, response, next) => {
    if (error.name === "UnauthorizedError") {
      response.status(401).send("你的登录已过期,请重新登录");
    }
  });

app
  .use("/login", loginRouter)
  .use("/task", taskRouter)
  .use("/user", userRouter)
  .use("/file", fileRouter);

app.listen(serverConfig.port, "0.0.0.0", () => {
  console.log("server is running in http://localhost:" + serverConfig.port);
});
