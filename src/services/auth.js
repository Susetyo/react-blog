import config from '../config';
import axios from 'axios';
import { validateAll } from 'indicative/validator';

export default class AuthService{

    async registerUser(data){
        const rules = {
            username:'required|string',
            email:'required|email',
            password:'required|string|min:9|confirmed',
        }

        const messages = {
            required: 'This {{field}} is required.',
            'email.email': 'This email is not valid.',
            'password.confirmed': 'This password doesn not match.'
        }


        try{
            await validateAll(data,rules, messages)

            const response =  await axios.post(`${config.apiUrl}/auth/register`,{
                name: data.username,
                email: data.email,
                password: data.password
            })

            return response.data.data;

        }catch(errors){
            const formatedErrors = {}
            if(errors.status == 422){
                formatedErrors['email'] = errors.response.data['email'][0];
                return Promise.reject(formatedErrors);
            }

            errors.forEach(error=> formatedErrors[error.field] = error.message);
            return Promise.reject(formatedErrors);
        }
    }

}