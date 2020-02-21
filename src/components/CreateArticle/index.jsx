import React from 'react';
import CreateArticleForm from './CreateArticleForm/index';
import PropTypes from 'prop-types';
class CreateArticle extends React.Component{
    constructor(){
        super();

        this.state={
            errors:{},
            image:null,
            title: '',
            category:'',
            content:'',
            categories:[],
        }

    }

    async componentWillMount(){
        const categories = await this.props.getArticlesCategories()

        this.setState({categories})
    }

    handleSubmit = async (event) =>{
        event.preventDefault();

        try{
            let article = await this.props.createArticle(this.state,this.props.token);
            this.props.history.push('/')
        }catch(errors){
            console.log(errors)
            this.setState({errors})
        }
    }

    handleChangeInput = (event) => {
        this.setState({
            [event.target.name] : event.target.type == "file" ? event.target.files[0] : event.target.value
        })
    }


    render(){
        return(<CreateArticleForm
            handleSubmit = {this.handleSubmit}
            categories = {this.state.categories} 
            handleChangeInput={this.handleChangeInput} />)
    }
}

export default CreateArticle;

CreateArticle.propTypes = {
    getArticlesCategories: PropTypes.func.isRequired,
    createArticle: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
}