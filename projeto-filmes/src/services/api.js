import axios from "axios"

// Base da URL: https://api.themoviedb.org/3/
// URL DA API: movie/now_playing?api_key=0a55489eec4b43b64ae5c625d3e776ae&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;