import React from 'react';
import Articles from './Articles'; 

class Welcome extends React.Component{
  constructor(){
    super();
    this.state={
      art: [],
    }
  }

  async componentWillMount(){
    const art = await this.props.getArticles();
    this.setState({art})
  }

  render(){
    return(<Articles art={this.state.art} />)
  }

    
}

export default Welcome;