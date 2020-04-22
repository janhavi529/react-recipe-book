import axios from 'axios';

// Create Axios instances:
const instance = axios.create({
    baseURL: 'https://react-recipe-book-1456a.firebaseio.com' // If you don't have the same baseURL for all services, 
    // you can define a baseURL in the axios instance (axios.js) and then import the instance from axios.js file, wherever you need that URL.
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// You can also add interceptors here. 

export default instance;