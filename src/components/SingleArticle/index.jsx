import React from 'react';
import Article from './Article';

class SingleArticle extends React.Component{
  constructor(){
    super();
    this.state = {
      art:{},
      loading:false
    }
  }

  async componentWillMount(){
    if(localStorage.getItem('articles')){
      let res = JSON.parse(localStorage.getItem('articles')).find(s=>s.slug === this.props.match.params.slug)
      this.setState({art:res,laoding:false})
    }else{
      const res = await this.props.getArticle(this.props.match.params.slug);
      this.setState({art:res,laoding:false})
    }
  }

  render(){
    return(
      <div>
      {
        !this.state.loading && <Article art={this.state.art} />
      }
      {
        this.state.loading && <p>Loading.....</p>
      }
      </div>
      
    )
  }

}


export default SingleArticle;