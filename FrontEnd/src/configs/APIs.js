
import axios from "axios";

const HOST = 'http://127.0.0.1:8000/';

export const endpoints = {
    'login': '/o/token/',
    'catalogs': '/catalogs/',
    'products': '/products/'
}

export const authAPI = (accessToken) => axios.create({
    baseURL: HOST,
    headers: {
        "Authorization": `Bearer ${accessToken}`
    },
});

export default axios.create({
    baseURL: HOST,
})
