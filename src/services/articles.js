import config from '../config';
import axios from 'axios';
import { validateAll } from 'indicative/validator';

export default class ArticlesServices{

  async getArticles(){
    const r = await axios.get(`${config.apiUrl}/articles`)
    return r.data.data.data;
  }

  async getCategories(){
    const response = await axios.get(`${config.apiUrl}/categories`)
    return response.data.categories
  }

  createArticle = async (data,token) =>{
    try{
      const img = await this.uploadImagesToCloudinary(data.image);
      const rules = {
        image:'required',
        title: 'required',
        category:'required',
        content:'required',
      }
      const messages = {
        required: `{{field}} is required`,
      }
      await validateAll(data,rules,messages);
      const res = await axios.post(`${config.apiUrl}/articles`,{
        imageUrl:img.secure_url,
        title: data.title,
        category_id:data.category,
        content:data.content
      },{
        headers:{Authorization:`Bearer ${token}`}
      })
      return res.data;
    }catch(err){
      if(err.response) return Promise.reject([err.response.data.error])
      return Promise.reject(err)
    }
  }

  async uploadImagesToCloudinary(img){
    let f = new FormData();
    f.append('file',img)
    f.append('upload_preset','ml_default')
    
      const res =  await axios.post('https://api.cloudinary.com/v1_1/ilotte-com/image/upload',f);
    
      return res.data;
    

  }
}