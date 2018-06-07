import axios from'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-6433e.firebaseio.com/'
});

export default instance;