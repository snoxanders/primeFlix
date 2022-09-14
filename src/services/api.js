import axios from 'axios'

// Base da URL
// https://api.themoviedb.org/3/ //


//URl da Api// 
// movie/now_playing?api_key=a6c1fdc8a303050be2dd183a6e0f37cc&language=pt-br //

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;








