// 服务配置
const serverConfig = {
    port: 3001 
};


// 跨域配置
const corsConfig = {
    origin: ['http://localhost:3000', 'http://116.62.139.167:3000'], // 前端设置credentials: true后端origin不能为*
    methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
    maxAge: 600,
    preflightContinue: false,
    optionsSuccessStatus: 204
};


// 数据库配置
const mysqlConfig = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'user'
};


// 密钥
const secretKey = 'key';


// 白名单
const whiteList = [
    '/login/login',  
    '/login/register', 
    '/login/findEmail', 
    '/login/sendEmail', 
    '/login/resetPassword', 
    '/file/uploadAvatar', 
    '/file/uploadFiles'
];


// 邮箱配置
const emailConfig = {
    neteaseConfig: {
        service: 'smtp.163.com',
        host: 'smtp.163.com',
        secure: true,
        port:465,
        auth: {
            user: 'hcc96923@163.com',
            pass: 'DYSUSQVPAHWUAYBX'
        }
    },
    qqConfig: {
        service: 'smtp.qq.com',
        host: 'smtp.qq.com',
        secure: true,
        port:465,
        auth: {
            user: '734499162@qq.com',
            pass: 'tlhfreucwmcobbac'
        }
    },
    secretKey: 'emailSecretKey'
};


module.exports = {
    serverConfig,
    corsConfig,
    mysqlConfig,
    secretKey,
    whiteList,
    emailConfig
};
