import request from '@/utils/request';


export const uploadAvatar = (data) => {
    return request({
        url: '/file/uploadAvatar',
        method: 'post',
        data
    });
}


export const uploadMultipleFile = (data) => {
    return request({
        url: '/file/uploadMultipleFile',
        method: 'post',
        data
    });
}


export const deleteSingleFile = (data) => {
    return request({
        url: '/file/deleteSingleFile',
        method: 'delete',
        data: { data }
    });
}


export const deleteAllFile = (data) => {
    return request({
        url: '/file/deleteAllFile',
        method: 'delete',
        data: { data }
    });
}


export const getFileList = (data) => {
    return request({
        url: '/file/getFileList',
        method: 'get',
        data: { data }
    });
}


export const getMyUploadList = (data) => {
    return request({
        url: '/file/getMyUploadList',
        method: 'get',
        data: { data }
    });
}