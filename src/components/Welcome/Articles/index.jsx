import React from 'react';
import Article from '../../Article';
import Banner from '../../Banner';

const Articles = ({art,next,prev}) =>{
    return(
        <div>
          <Banner 
            backgroundImage='url(assets/img/bg-gift.jpg)'
            title='Latest Blog Posts'
            subTitle='Read and get updated on how we progress.'/>
            <main className="main-content bg-gray">
              <div className="row">
                <div className="col-12 col-lg-6 offset-lg-3">
                  {art.map((a,i)=><Article key={i} d={a} />)}
                  <nav className="flexbox mb-50 mt-50">
                    <a className="btn btn-white" onClick={prev}>
                      <i className="ti-arrow-left fs-9 mr-4" />Older</a>
                    <a className="btn btn-white" onClick={next}>Newer
                      <i className="ti-arrow-right fs-9 ml-4" />
                    </a>
                  </nav>
                </div>
              </div>
            </main>
        </div>
    )
}

export default Articles;