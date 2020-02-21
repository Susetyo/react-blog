import React from 'react';
import CreateArticleForm from './CreateArticleForm/index';

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

        await this.props.createArticle(this.state);
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