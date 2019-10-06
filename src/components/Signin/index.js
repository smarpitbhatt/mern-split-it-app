import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Signin extends React.Component {
    constructor(props) {
        super(props);

        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            message:this.props.message
        }
        
    }

    componentDidMount() {
        if(localStorage.token!==undefined) window.location = '/home';
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }            

    onSubmit(e) {
        e.preventDefault();

        var user = {
            username : this.state.username,
            password : this.state.password
        }
       axiosPostRequest(user);
    }

    render() {
        return (
            <div className="mt-5">
            <h3>SIGN IN:</h3>
            
            <Messages c={this.state.message} /> 

            <br />
            <form className="form-group" onSubmit={this.onSubmit}>
 
                
                <label>Username:</label>
                <input type="text" className="form-control" value={this.state.username} onChange={this.onChangeUsername}  required></input>
                
                <br />

                <label>Password:</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.onChangePassword}  required></input>

                <br />

                <p><input type="submit" className="btn btn-primary" value="Submit"></input>
                <Link to="/signup"><span className="tab"> </span>( New here? Signup )</Link></p>

            </form>
            </div>
        )
    }
    
}

function Messages(props) {
    if(props.c===undefined || props.c ===null) 
    return (<p></p>)
    else
    return (<div className="alert alert-danger">{props.c}</div>)
}

var axiosPostRequest = (user)=> {
    axios.post('http://localhost:5000/user/signin', user)
    .then( res=> {
        console.log(res);

            localStorage.token = JSON.stringify(res.data.auth);
            window.location = '/home';
            this.props.onsignin(res.data.user);
    })
    .catch(err => {
        if(err.response && err.response.status === 401) {
            this.setState({message: 'Credentials Incorrect.'})
        }
    });
}