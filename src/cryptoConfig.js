import axios from 'axios';

const cryptoConfig = axios.create({
  baseURL: 'https://criptoya.com/api/', 
  headers: {}
});

export default cryptoConfig;