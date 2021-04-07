import axios from 'axios';

const api = axios.create({
    baseURL: "https://api-giulen.herokuapp.com:443/"
})

export default api;
