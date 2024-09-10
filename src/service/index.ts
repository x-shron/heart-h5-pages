import { request } from "./request";

const successCode = 200;

const baseURL ='https://springboot-p6qg-111263-4-1325524078.sh.run.tcloudbase.com'

export const getDynamicDetail = async (id?: any) => {
    const res = await request({
        baseURL,
        method: 'get',
        url: `/api/user/trends/${id}`,
    });
    return res.data;
};

export const getJobs = async (id?: any) => {
    const res = await request({
        baseURL,
        method: 'get',
        url: `/api/config/vocationMap`,
    });
    return res.data;
};

export const getAreasMap = async (id?: any) => {
    const res = await request({
        baseURL,
        method: 'get',
        url: `/api/config/districtCodeMap`,
    });
    return res.data;
};

export const uploadFileImg = async (params?: any) => {
    const res = await request({
        baseURL,
        method: 'post',
        url: `/api/file/upload/image?t=${new Date().getTime()}`,
        data: params
    });
    return res.data;
};

export const deleteFileImg = async (params?: any) => {
    const res = await request({
        baseURL,
        method: 'post',
        url: `/api/file/remove/image`,
        data: params
    });
    return res.data;
};

export const entryUser = async (params?: any) => {
    const res = await request({
        baseURL,
        method: 'post',
        url: `/api/user/entry/modify`,
        data: params
    });
    return res.data;
};

export const entryUserList = async (params?: any) => {
    const res = await request({
        baseURL,
        method: 'post',
        url: `/api/user/entry/page`,
        data: params
    });
    return res.data;
};
