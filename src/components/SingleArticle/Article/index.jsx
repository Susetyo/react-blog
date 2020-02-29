import React from 'react';
const Article = ({art}) => {
  return(
    <div>
      { art.user !== undefined && 
        <div>
          <header 
            className="header header-inverse h-fullscreen pb-80" 
            style={{backgroundImage: `url(${art.imageUrl})`}} 
            data-overlay={8}>
            <div className="container text-center">
              <div className="row h-full">
                <div className="col-12 col-lg-8 offset-lg-2 align-self-center">
                  <h1 className="hidden-md-up">{art.title}</h1>
                  <br />
                  <p>
                    <span className="opacity-70 mr-8">By</span>
                    <a className="text-white" href="#">{art.user.name}</a>
                  </p>
                  <p>
                    <img className="rounded-circle w-40" src={`${process.env.PUBLIC_URL}/assets/img/avatar/2.jpg`} alt="..." />
                  </p>
                  </div>
                  <div className="col-12 align-self-end text-center">
                  <a className="scroll-down-1 scroll-down-inverse" href="#" data-scrollto="section-content">
                    <span />
                  </a>
                </div>
              </div>
            </div>
          </header>
          <main className="main-content">
            <div className="section" id="section-content">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-lg-8 offset-lg-2">
                    <p className="lead">{art.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      }
    </div>
  )
}
export default Article;