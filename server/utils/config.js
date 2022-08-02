// server config
const serverConfig = {
    port: 3001 
};


// cross domain config
const corsConfig = {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};


// database config
const mysqlConfig = {
    connectionLimit: 10,
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'user'
};


// secret key
const secretKey = 'key';


// white list
const whiteList = [
    '/login/userLogin',  
    '/login/userRegister', 
    '/login/findEmail', 
    '/login/sendEmail', 
    '/login/resetPassword', 
    '/file/uploadAvatar', 
    '/file/uploadFiles'
];


// email config
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
