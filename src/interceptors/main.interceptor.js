import axios from 'axios'
 
axios.interceptors.request.use((config) => {
    config.baseURL = 'https://marketdata.tradermade.com/api/v1/'

    config.params= {...config.params, api_key: 're-sTctJMuxnUoxAwTK9'};
    return config;
 })
