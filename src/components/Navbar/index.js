import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';

export default class Navbar extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        User: {}
      }
      this.logout = this.logout.bind(this);
    }

    componentDidMount() {
      // var user=undefined;

      // if(this.props.user.name) user = this.props.user;

      // this.setState({User: user});

      // console.log(user);
    }

    updateNavbarState() {
      console.log(this.props.user);
      this.setState( {User: this.props.user} );
    }

    logout() {
      localStorage.removeItem("token");
      this.setState({ User: {}});
      window.location = '/home';
    }

    render() {
        return(
<nav className="navbar navbar-expand-md navbar-dark bg-dark p-20">
  <Link className="navbar-brand" to="/"><h3>SPLIT IT</h3></Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
      <li className="nav-item mr-auto active">
        <Link className="btn btn-secondary nav-link" to="/home">Dashboard <span className="sr-only">(current)</span></Link>
      </li>

<div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    {this.state.User.name? (this.state.User.name).toUpperCase():'User Management'}
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <Link className="dropdown-item" to="/profile">{this.state.User.name? 'Profile':''}<span className="sr-only">(current)</span></Link>
    <Link className="dropdown-item" to="/signin">{this.state.User.name?'':'logIn'}<span className="sr-only">(current)</span></Link>
    <Link className="dropdown-item" onClick={this.logout} to='#'>{this.state.User.name?'Logout':'' }<span className="sr-only">(current)</span></Link>
    <Link className="dropdown-item" to="/signup">SignUp<span className="sr-only">(current)</span></Link>
  </div>
</div>

      
    </ul>
  </div>
</nav>
        )
    }
}