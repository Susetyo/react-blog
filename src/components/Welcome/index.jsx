import React from 'react';
import Articles from './Articles'; 

class Welcome extends React.Component{
  constructor(){
    super();
    this.state={
      art: [],
      paginate:{}
    }
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  async componentWillMount(){
    const art = await this.props.getArticles("");
    const paginate = await this.props.getPaginateArticles("");
    this.setState({art,paginate})
  }

  async next(){
    const art = await this.props.getArticles(this.state.paginate.next_page_url);
    const paginate = await this.props.getPaginateArticles(this.state.paginate.next_page_url);
    this.setState({art,paginate})
  }

  async prev(){
    const art = await this.props.getArticles(this.state.paginate.prev_page_url);
    const paginate = await this.props.getPaginateArticles(this.state.paginate.prev_page_url);
    this.setState({art,paginate})
  }

  render(){
    return(<Articles 
      next={this.next}
      prev={this.prev}
      
      art={this.state.art} />)
  }    
}

export default Welcome;