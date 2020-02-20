import config from '../config';
import axios from 'axios';

export default class ArticlesServices{
  async getCategories(){
    const response = await axios.get(`${config.apiUrl}/categories`)

    return response.data.categories
  }
}