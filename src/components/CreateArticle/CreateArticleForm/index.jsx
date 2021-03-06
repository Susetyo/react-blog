import React from 'react';
import Banner from '../../Banner';

const CreateArticleForm = ({handleChangeInput,categories,handleSubmit,errors}) => {
  return(
    <div>
      <Banner 
          backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-laptop.jpg)`}
          title="Write an article"/>
      <main className="main-content">
        <section className="section">
          <div className="container">
            <div className="row">              
              <div className="col-12 col-lg-12">
                  <ul className="list-group">
                    {errors.map((error,index)=> <li key={index} className="list-group-item text-danger">{error.message}</li>)}
                  </ul>
                  <form 
                    className="p-30 bg-gray rounded"  
                    data-form="mailer"
                    onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-group col-md-12 my-5">
                          <input type="file" className="form-control" onChange={handleChangeInput} name="image" />
                        </div>
                        <div className="form-group col-12 col-md-6">
                          <input className="form-control form-control-lg" onChange={handleChangeInput} name="image"  type="text" name="title" placeholder="Title" />
                        </div>
                        <div className="form-group col-12 col-md-6">
                          <select 
                            onChange={handleChangeInput} 
                            name="category" 
                            className="form-control form-control-lg">
                              {categories.map(category=><option value={category.id} key={category.id}>{category.name}</option>)}
                          </select>
                        </div>
                    </div>
                    <div className="form-group">
                      <textarea className="form-control form-control-lg" rows={4} placeholder="Content" onChange={handleChangeInput} name="content" defaultValue={""} />
                    </div>
                    <div className="text-center">
                      <button className="btn btn-lg btn-primary" type="submit">Create Article</button>
                    </div>
                  </form>
              </div>
              </div>
            </div>
        </section>
      </main>
    </div>
    
  )
} 

export default CreateArticleForm;