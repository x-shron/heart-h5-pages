import { request } from "./request";

const successCode = 200;

export const getDynamicDetail = async (id?: any) => {
    const res = await request({
        method: 'get',
        url: `/api/user/trends/${id}`,
    });
    return res.data;
};