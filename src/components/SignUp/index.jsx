import React from 'react'
import {Link} from 'react-router-dom';
import { validateAll } from 'indicative/validator';
import axios from 'axios';
import config from '../../config';

class SignUp extends React.Component{

    constructor(){
        super()
        this.state = {
            username:'',
            email:'',
            password:'',
            password_confirmation:'',
            errors:{}
        }

    }

    handleChangeInput = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleFormSubmit = async (event) => {
        event.preventDefault();
        const data = this.state;
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

            try{
                const response =  await axios.post(`${config.apiUrl}/auth/register`,{
                    name: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                })

                localStorage.setItem('user',JSON.stringify(response.data.data));
                this.props.setAuthUser(response.data.data);
                this.props.history.push('/');

            }catch(errors){
                const formatedErrors = {}
                formatedErrors['email'] = errors.response.data['email'][0];
                this.setState({errors:formatedErrors}); 
            }

        }catch(errors){
            const formatedErrors = {}
            errors.forEach(error=> formatedErrors[error.field] = error.message);
            this.setState({errors:formatedErrors});
        }
    }

    render(){
        return(
            <div className="mh-fullscreen bg-img center-vh p-20" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bg-girl.jpg)`}}>
                <div className="card card-shadowed p-50 w-400 mb-0" style={{maxWidth: '100%'}}>
                    <h5 className="text-uppercase text-center">Register</h5>
                    <br />
                    <br />
                    <form className="form-type-material" onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <input onChange={this.handleChangeInput} type="text" name="username" className="form-control" placeholder="Username" />
                            {
                                this.state.errors['username'] &&
                                <small className="text-danger">{this.state.errors['username']}</small>
                            }
                        </div>
                        <div className="form-group">
                            <input onChange={this.handleChangeInput} name="email" type="text" className="form-control" placeholder="Email address" />
                            {
                                this.state.errors['email'] &&
                                <small className="text-danger">{this.state.errors['email']}</small>
                            }
                        </div>
                        <div className="form-group">
                            <input onChange={this.handleChangeInput} name="password" type="password" className="form-control" placeholder="Password" />
                            {
                                this.state.errors['password'] &&
                                <small className="text-danger">{this.state.errors['password']}</small>
                            }
                        </div>
                        <div className="form-group">
                            <input onChange={this.handleChangeInput} name="password_confirmation" type="password" className="form-control" placeholder="Password (confirm)" />
                        </div>
                        <br />
                        <button className="btn btn-bold btn-block btn-primary" type="submit">Register</button>
                    </form>
                    <hr className="w-30" />
                    <p className="text-center text-muted fs-13 mt-20">Already have an account?
                        <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </div>            
        )
    }

}

export default SignUp;