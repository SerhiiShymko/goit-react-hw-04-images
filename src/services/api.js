import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

async function getImages(query, page) {
  const BASE_URL = `https://pixabay.com/api/`;
  const KEY = '34798560-686184bc87076e66494c7fccc';
  const params = `?key=${KEY}&q=${query}$&page=1&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`;
  const response = await fetch(`${BASE_URL}${params}`);
  return await response.json();
}

export default getImages;
