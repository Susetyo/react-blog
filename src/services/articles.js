import config from '../config';
import axios from 'axios';

export default class ArticlesServices{
  async getCategories(){
    const response = await axios.get(`${config.apiUrl}/categories`)

    return response.data.categories
  }

  createArticle = async (data,token) =>{
    const img = await this.uploadImagesToCloudinary(data.image);
    try{
      const res = await axios.post(`${config.apiUrl}/articles`,{
        imageUrl:img.secure_url,
        title: data.title,
        category_id:data.category,
        content:data.content
      },{
        headers:{Authorization:`Bearer ${token}`}
      })

      console.log(res)

      return res.data;
    }catch(err){
      console.log(err)

      return err.response.data
    }
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