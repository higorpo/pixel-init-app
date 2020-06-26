import axios from 'axios';

const api = axios.create({
    baseURL: "http://54.197.125.89:3333"
})

export default api;