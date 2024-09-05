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