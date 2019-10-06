import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.js';
import axios from 'axios';

import './App.css';

import Home from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Profile from './components/Profile';

export default class App extends React.Component {
  constructor(props) {
    
    super(props);
    this.onSignIn = this.onSignIn.bind(this);
    this.navbarElement = React.createRef();

    this.state = {
      User: {}
    }

  }

  axiosGetUser = (token)=> {
    axios.get('http://localhost:5000/user/verify/'+token)
      .then( response => {
        console.log(response);
        this.setState({User: response.data.user});
        this.navbarElement.current.updateNavbarState();
      })
      .catch( err => console.log('Token Err') );
  }

  componentDidMount() {
    console.log(this.state.User);

    try{
    var token = JSON.parse(localStorage.token);
    }
    catch(e) {
      console.log("App: Token err");  
    }
    
    console.log(token);
    if(token) {
      this.axiosGetUser(token);
    }

  }

  onSignIn(user) { 
    this.navbarElement.current.updateNavbarState(user);
  }

  dashboardRoute() {
    if(this.state.User.name) {
      return <Home user={this.state.User} />;
    }
    else {
      return <Signin onsignin={this.onSignIn} message={"Not Signed In."} />;
    }

  }

  render() {
    
  return (
      <Router>        
        <Navbar user={this.state.User} ref={this.navbarElement} />
      <div className="container justify-content-center">
       <Route path="/home" exact component={Home} /> 

          <Route path="/signup" component={Signup} />
          
          <Route path="/signin" render = {
            () =><Signin onsignin={this.onSignIn} />
          }/>

          <Route path="/profile" render = {
            () =><Profile user={this.state.User} />
          }/>  
      </div>
      </Router>
    );
  }
}

