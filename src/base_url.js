import axios from 'axios';
import configData from '../src/config.json';
export const request_public = axios.create({
    baseURL: configData.URL.SERVER_URL,
});
