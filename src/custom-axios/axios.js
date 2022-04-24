import axios from 'axios'

const instance = axios.create({
    baseURL:"https://emt-library-backend-196060.herokuapp.com/",
    headers: {
        "Access-Control-Allow-Origin" : '*'
    }
})

export default instance;