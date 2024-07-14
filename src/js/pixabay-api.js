import axios from 'axios';

const API_KEY = "44825095-5da981a8d37f63705e36ec7d1";

export async function fetchData({ q, page, pageSize } = {}) {
  try{
    const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${pageSize}&lang=en`)
    return response.data;
  }
  catch(error){
    console.error('Error fetching data:', error);
    throw error;
  }
}
