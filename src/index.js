import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Link, withRouter} from 'react-router-dom';
import Navbar from './components/NavBar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import CreateArticle from './components/CreateArticle';
import Login from './components/Login';
import SingleArticle from './components/SingleArticle';
import SignUp from './components/SignUp';
import AuthService from './services/auth';
import ArticlesServices from './services/articles';

class App extends React.Component{
    constructor(){
        super();

        this.state = {
            authUser: null
        }
    }

    componentDidMount(){
        const user = localStorage.getItem('user')
        
        if(user) this.setState({ authUser: JSON.parse(user) })
    }

    setAuthUser= (authUser) =>{
        this.setState({ authUser })
    }

    render(){
        const {location} = this.props;
        return(
            <div>
                {
                    location.pathname !== '/login' && location.pathname !== '/signup' &&
                    <Navbar  authUser={this.state.authUser} />
                }
                <Route 
                    exact 
                    path="/" 
                    render={(props)=><Welcome 
                        {...props}
                        getArticles = {this.props.articlesServices.getArticles}
                    />}></Route>
                <Route 
                    path="/articles/create" 
                    render={(props)=><CreateArticle 
                        {...props}
                        getArticlesCategories = {this.props.articlesServices.getCategories}
                        createArticle = {this.props.articlesServices.createArticle}
                        token = {this.state.authUser !== null ? this.state.authUser.token : null}
                    />}></Route>
                <Route 
                    path="/login" 
                    render={(props)=><Login 
                        {...props}
                        loginUser={this.props.authService.loginUser}
                        setAuthUser={this.setAuthUser} 
                    />}
                >
                </Route>
                <Route 
                    path="/signUp" 
                    render={(props)=><SignUp 
                            {...props} 
                            registerUser={this.props.authService.registerUser}
                            setAuthUser={this.setAuthUser} />}>
                </Route>
                <Route path="/article/:slug" component={SingleArticle}></Route>
                {
                    location.pathname !== '/login' && location.pathname !== '/signup' &&
                    <Footer />
                }
            </div>
        )
    }

}


const Main = withRouter((props)=>{
    return( <App 
            articlesServices = { new ArticlesServices()}
            authService = {new AuthService()} 
            {...props} />)
})

ReactDOM.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
