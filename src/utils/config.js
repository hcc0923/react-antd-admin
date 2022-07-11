/* 
    SERVER_ADDRESS
    测试环境生产环境
*/
export let SERVER_ADDRESS;
if (process.env.NODE_ENV === 'development') { 
    SERVER_ADDRESS = 'http://localhost:3001';
} else { 
    SERVER_ADDRESS = 'http://116.62.139.167:3001';
}
/* 
    EMAIL_KEY
    邮箱验证码秘钥
*/
export const EMAIL_KEY = 'emailSecretKey';
