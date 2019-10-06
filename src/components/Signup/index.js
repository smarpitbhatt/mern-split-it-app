import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            contact: 0,
            username: '',
            password: ''
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeContact(e) {
        this.setState({
            contact: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }            

    onSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            contact: this.state.contact,
            username: this.state.username,
            password: this.state.password
        }

        axiosPostRequest(user);

        // window.location = '/signin'
    }

    render() {
        return (
        <div>
            <h3>SIGN UP:</h3>
            <br />
            <form className="form-group" onSubmit={this.onSubmit}>
                <label>Full Name:</label>
                <input type="text" className="form-control" placeholder="eg. John Wick" value={this.state.name} onChange={this.onChangeName} required></input>
                
                <br />

                <label>Email:</label>
                <input type="email" className="form-control" placeholder="johnwick@gmail.com" value={this.state.email} onChange={this.onChangeEmail} required></input>

                <br />

                <label>Contact Number:</label>
                <input type="number" className="form-control" value={this.state.contact} onChange={this.onChangeContact} required maxLength="10"></input>

                <br />

                <label>Choose a Username:</label>
                <input type="text" className="form-control" value={this.state.username} onChange={this.onChangeUsername}  placeholder="Choose a username.." required></input>
                
                <br />

                <label>Choose a Password:</label>
                <input type="password" className="form-control" placeholder="*********" value={this.state.password} onChange={this.onChangePassword}  required></input>

                <br />

                <input type="submit" className="btn btn-primary" value="Submit"></input>

                <Link className="link" to="/signin"><span className="tab"> </span>( Already Have an Account? Signin )</Link>
            </form>
        </div>
        )
    }
}

var axiosPostRequest = (user)=> {
    axios.post('http://localhost:5000/user/signup', user)
        .then( res => {
            console.log(res);

            localStorage.token = JSON.stringify(res.data.auth);
            window.location = '/signin';
        })
        .catch( err =>{
            if(err.response.status === 401) {
                console.log('Credentials Incorrect!');
            }
        });
}