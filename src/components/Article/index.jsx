import React from 'react';
import {Link} from 'react-router-dom';
var moment = require('moment');
const Article = ({d}) =>{
    return(
      <article className="mt-90">
        <header className="text-center mb-40">
          <h3><a href={d.slug+'.html'}>{d.title}</a></h3>
          <div className="link-color-default fs-12">
            <a href={`${d.category.slug}.html`}>{d.category.name}</a>,
            <time>{moment(`${d.created_at}`,'YYYY-MM-DDTHH:mm:ss').format('llll')}</time>
          </div>
        </header>
          <a href={d.slug+'.html'}>
            <img className="rounded" src={d.imageUrl} alt={d.slug} />
          </a>
          <div className="card-block">
            <p className="text-justify">{d.content}</p>
            <p className="text-center mt-40">
              <Link 
                className="btn btn-primary btn-round" 
                to={`/article/${d.slug}`}>Read more</Link>
            </p>
          </div>
      </article>
    )
}

export default Article;