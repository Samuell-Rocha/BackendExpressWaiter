import axios from 'axios';

const api = axios.create({
   //baseURL: "http://localhost:2627"
   baseURL: 'http://192.168.0.106:2627'
})

export {api}

