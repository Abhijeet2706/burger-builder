import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-f6f73.firebaseio.com/'
});

export default instance;