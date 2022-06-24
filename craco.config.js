const path = require('path');
const resolve = pathUrl => path.join(__dirname, pathUrl);


module.exports = {
    webpack: {
        alias: {
            '@': resolve('src')
        }
    }
};