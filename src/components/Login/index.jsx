import React from 'react';
import LoginForm from './LoginForm';

class Login extends React.Component{
    constructor(){
        super();

        this.state = {
            email: '',
            password:'',
            errors:{}
        }
    }

    handleChangeInput = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const user = await this.props.loginUser(this.state)
            localStorage.setItem('user',JSON.stringify(user));
            this.props.setAuthUser(user);
            this.props.history.push('/');
        }catch(errors){
            this.setState({errors});
        }
    }

    render(){
        return <LoginForm 
            handleSubmit = {this.handleSubmit}
            handleChangeInput={this.handleChangeInput} 
            errors={this.state.errors}
        />
    }
}



export default Login;