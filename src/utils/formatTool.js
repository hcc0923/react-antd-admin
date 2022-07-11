/* 
    formatAmount
    格式化价格
*/
export const formatAmount = (val, n=0) => {
    if (val) {
        const num = parseInt(val, 10);
        return (num.toFixed(n).toString()).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
    }
    return '0.00';
}
/* 
    resolveTitle
    处理document.title
*/
export const resolveTitle = (location, route) => {
    const { pathname } = location;
    const { routes } = route;
    routes.forEach(item => {
        if (pathname === item.path) {
            document.title = item.meta.title;
        }
    });
}
/* 
    formatGMTTime
    格式化GMT时间
*/
export const formatGMTTime = time => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    let result = year + '-';
    if (month < 10) {
        result += '0' + month + '-';
    } else {
        result += month + '-';
    }
    if (day < 10){
        result += '0' + day;
    } else {
        result += day;
    }
    if (hours < 10) {
        result += ' 0' + hours + ':';
    } else {
        result += ' ' + hours + ':';
    }
    if (minutes < 10) {
        result += '0' + minutes + ':';
    } else {
        result += minutes + ':';
    }
    if (seconds < 10) {
        result += '0' + seconds;
    } else {
        result += seconds;
    }
    return result;
}
/* 
    formatRole
    格式化权限
*/
export const formatRole = (role) => {
    switch (role) {
        case 1:
            return "user";
        case 2:
            return "admin";
        case 3:
            return "root";
        default:
            break;
    }
}
/* 
    formatProvince
    格式化省份
*/
export const formatProvince = province => {
    switch (province) {
        case '湖北省':
            return '湖北';
        case '中国香港':
            return '香港';
        case '广东省':
            return '广东';
        case '上海市':
            return '上海';
        case '黑龙江省':
            return '黑龙江';
        case '浙江省':
            return '浙江';
        case '河北省':
            return '河北';
        case '河南省':
            return '河南';
        case '北京市':
            return '北京';
        case '湖南省':
            return '湖南';
        case '安徽省':
            return '安徽';
        case '新疆维吾尔自治区':
            return '新疆';
        case '中国台湾':
            return '台湾';
        case '江西省':
            return '江西';
        case '四川省':
            return '四川';
        case '山东省':
            return '山东';
        case '江苏省':
            return '江苏';
        case '重庆市':
            return '重庆';
        case '吉林省':
            return '吉林';
        case '福建省':
            return '福建';
        case '陕西省':
            return '陕西';
        case '辽宁省':
            return '辽宁';
        case '内蒙古自治区':
            return '内蒙古';
        case '天津市':
            return '天津';
        case '广西壮族自治区':
            return '广西';
        case '山西省':
            return '山西';
        case '云南省':
            return '云南';
        case '甘肃省':
            return '甘肃';
        case '海南省':
            return '海南';
        case '贵州省':
            return '贵州';
        case '宁夏回族自治区':
            return '宁夏';
        case '中国澳门':
            return '澳门';
        case '青海省':
            return '青海';
        case '西藏自治区':
            return '西藏';
        default:
            break;
    }
}