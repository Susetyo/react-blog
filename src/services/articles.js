import config from '../config';
import axios from 'axios';

export default class ArticlesServices{
  async getCategories(){
    const response = await axios.get(`${config.apiUrl}/categories`)

    return response.data.categories
  }

  createArticle = async (data) =>{
    await this.uploadImagesToCloudinary(data.image);
  }

  async uploadImagesToCloudinary(img){
    let f = new FormData();
    f.append('file',img)
    f.append('upload_preset','ml_default')

    console.log(img)
    const res =  await axios.post('https://api.cloudinary.com/v1_1/ilotte-com/image/upload',f);

    return res.data;

  }
}