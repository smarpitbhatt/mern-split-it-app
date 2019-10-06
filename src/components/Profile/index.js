import React from 'react';
import './index.css';
import axios from 'axios';

export default class profile extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
          User: {}
      }
    }

    componentDidMount() {
        try{
        var token = JSON.parse(localStorage.token);
        }
        catch(e) {
          console.log("Token APP err");  
        }
        console.log(token);
        
        if(token!==undefined) {
        
        axios.get('http://localhost:5000/user/'+token)
        .then( response => {
            console.log(response);
            this.setState({User: response.data});
        })
        .catch( err => console.log('Token Err'));
        }

    }

    render() {
        return(
            <div>
                <header id="main-header" className="py-2 bg-primary text-white shadow-sm p-3 rounded">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                <h1>Profile</h1> 
                                </div>
                            </div>
                        </div>
                </header>
                <div id="profile" className="container shadow-sm p-3 rounded">

                    <div className="row">
                        <div className="col-md-4">
                            <img src="profile.jpg"></img>       
                        </div>
                        <div className="col-md-6 container">
                            <h1 className="display-3">{this.state.User.name}</h1>
                            <img height="40" width="50" src="email.png" /> <span className="h5">&nbsp;&nbsp;&nbsp;&nbsp;{this.state.User.email}</span><br />
                            <img height="40" width="50" src="contact.png" /> <span className="h5">&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-primary">+91</span>&nbsp;&nbsp;{this.state.User.contact}</span><br />
                            <hr />
                            <span className="h6">bio: Lorem ipsum dolor sit amet, 
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt
                             ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut aliquip
                               ex ea commodo consequat.</span>
                            <br /><br /><br />
                            <div className="container"> <button style={{border: 'none'}} className="text-primary bg-light justify-content-end rounded">Edit profile.</button> </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}