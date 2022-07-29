import request from '@/utils/request';

export const getUser = (data) => {
    return request({
        url: '/user/getUser',
        method: 'get',
        data: { data }
    });
}


export const addUser = (data) => {
    return request({
        url: '/user/addUser',
        method: 'post',
        data
    });
}


export const editUser = (data) => {
    return request({
        url: '/user/editUser',
        method: 'put',
        data
    });
}


export const deleteUser = (data) => {
    return request({
        url: '/user/deleteUser',
        method: 'delete',
        data: { data }
    });
}

export const multipleDelete = (data) => {
    return request({
        url: '/user/multipleDelete',
        method: 'delete',
        data: { data }
    });
}