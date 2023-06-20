import { request_public } from '../base_url';
import configData from '../config.json';

export const GetProfileDetailModels = async (id) => {
    const res = await request_public.get(configData.URL.GetProfileDetailModels, {
        params: { id },
    });
    return res;
};

export const Login = async (data) => {
    const res = await request_public.post(configData.URL.Login, data);
    return res;
};

export const Verify = async (data) => {
    const res = await request_public.post(configData.URL.SaveFile, data);
    return res;
};

export const GetProfileModels = async (fileName, signerName, userId, verificationDate) => {
    const res = await request_public.get(configData.URL.GetProfileModels, {
        params: { fileName, signerName, userId, verificationDate },
    });
    return res;
};

export const GetFileContent = async (id) => {
    const res = await request_public.get(configData.URL.GetFileContent, {
        params: { id },
    });
    return res;
};
