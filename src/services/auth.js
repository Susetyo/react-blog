import config from '../config';
import axios from 'axios';
import { validateAll } from 'indicative/validator';

export default class AuthService{

    async loginUser(data){
        const rules = {
            email:'required|email',
            password:'required|string',
        }

        const messages = {
            required: 'This {{field}} is required.',
            'email.email': 'This email is not valid.',
        }

        try{
            await validateAll(data,rules, messages)

            const response =  await axios.post(`${config.apiUrl}/auth/login`,{
                email: data.email,
                password: data.password
            })

            return response.data.data;

        }catch(errors){
            console.log(errors)
            const formatedErrors = {}
            if(errors.response !== undefined && errors.response.status == 401){
                formatedErrors['email'] = 'Invalid credentials.';
                return Promise.reject(formatedErrors);
            }

            errors.forEach(error=> formatedErrors[error.field] = error.message);
            return Promise.reject(formatedErrors);
        }
    }

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
            if(errors.response !== undefined && errors.response.status === 422){
                formatedErrors['email'] = errors.response.data['email'][0];
                return Promise.reject(formatedErrors);
            }

            errors.forEach(error=> formatedErrors[error.field] = error.message);
            return Promise.reject(formatedErrors);
        }
    }

}