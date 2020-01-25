import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Navbar from './components/NavBar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import CreateArticle from './components/CreateArticle';
import Login from './components/Login';
import SingleArticle from './components/SingleArticle';
import SignUp from './components/SignUp';

const Home = () => <h1>This is Home</h1>
const About = () => <h1>This is About</h1>

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Navbar />
            <Route exact path="/" component={Welcome}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/articles/create" component={CreateArticle}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/signUp" component={SignUp}></Route>
            <Route path="/article/:slug" component={SingleArticle}></Route>
            <Footer />
        </div>
    </BrowserRouter>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
