import React from 'react';
import Articles from './Articles'; 

class Welcome extends React.Component{
  constructor(){
    super();
    this.state={
      art: [],
      paginate:{},
    }
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  async componentWillMount(){
    let sameArticles = JSON.parse(localStorage.getItem('articles'));
    let samePaginate = JSON.parse(localStorage.getItem('paginate'));
    let checkerId = JSON.parse(localStorage.getItem('idChecker'));
    if(!localStorage.getItem('articles')){
      const art = await this.props.getArticles("");
      const paginate = await this.props.getPaginateArticles("");
      this.props.setArticles(art,paginate)
      this.setState({art,paginate})
    }else if(sameArticles.find(sa=> sa.id === checkerId)){
      this.setState({
        art: sameArticles,
        paginate: samePaginate
      })
    }
  }

  async next(){
    const art = await this.props.getArticles(this.state.paginate.next_page_url);
    const paginate = await this.props.getPaginateArticles(this.state.paginate.next_page_url);
    this.props.setArticles(art,paginate)
    this.setState({art,paginate})
  }

  async prev(){
    const art = await this.props.getArticles(this.state.paginate.prev_page_url);
    const paginate = await this.props.getPaginateArticles(this.state.paginate.prev_page_url);
    this.props.setArticles(art,paginate)
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