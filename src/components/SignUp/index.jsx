import React from 'react'
import SignUpForm from './SignUpForm';

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
        try{
            const user = await this.props.registerUser(this.state)
            localStorage.setItem('user',JSON.stringify(user));
            this.props.setAuthUser(user);
            this.props.history.push('/');
        }catch(errors){
            this.setState({errors});
        }
    }

    render(){
        return(
            <SignUpForm
                handleChangeInput={this.handleChangeInput}
                handleFormSubmit={this.handleFormSubmit}
                errors={this.state.errors}/>
        )
    }

}

export default SignUp;