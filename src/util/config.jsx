import axios from "axios";
import { history } from '../index';
import { store } from '../redux/store';

export const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1NyIsIkhldEhhblN0cmluZyI6IjE1LzA2LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxODQwOTYwMDAwMCIsIm5iZiI6MTY4ODkyMjAwMCwiZXhwIjoxNzE4NTU3MjAwfQ.vY7VplGBpsG599RYLEeMeajQNALOV5QUJ2dGV6Ow_q4';
export const USER_REGISTER = 'userRegister';
export const USER_LOGIN = 'userLogin';
export const USER_PROFILE = 'userProfile';
export const ACCESS_TOKEN = 'accessToken';

export const { getStore, getStoreJson, saveStoreJson} = {
    getStore: (name) => {
        if (localStorage.getItem(name)) {
            return localStorage.getItem(name);
        }
        return null;
    },
    getStoreJson: (name) => {
        if (localStorage.getItem(name)) {
            return JSON.parse(localStorage.getItem(name));
        }
        return null;
    },
    saveStoreJson: (name, object) => {
        let stringObject = JSON.stringify(object);
        localStorage.setItem(name, stringObject);
        return stringObject;
    },
}

export const http = axios.create({
    baseURL: 'https://fiverrnew.cybersoft.edu.vn/api',
    headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
    }
})

http.interceptors.request.use((config) => {
    // let accessToken = null;
    // const state = store.getState();

    // if (state.userReducer.userInfo) {
    //     accessToken = state.userReducer.userInfo.token;

    //     config.headers.token = accessToken;
    // }
    // return config;
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
        config.headers.Authorization = `${accessToken}`;
    }
    return config;
});

http.interceptors.response.use((res) => {
    return res;
}, (err) => {
    if (err.response?.status === 400) {
        alert("Email already exists. Please choose another email.");
        history.push('/register')
    } else if (err.response?.status === 401) {
        alert('Login to visit this page!')
        history.push('/login')
    } else if (err.response?.status === 404) {
        alert("Email or password is incorrect :((");
        history.push('/login');
    }
    return Promise.reject(err);
})
