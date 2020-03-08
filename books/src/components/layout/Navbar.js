import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { logoutUser } from '../../actions/authAction';
import axios from 'axios';

class Navbar extends Component {
    constructor(){
      super();
      this.state = {
        user : {},
        count : 0
      }
    }
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    componentDidMount(){
      axios.get('/api/user/current')
            .then(res=>{
              this.setState({user : res.data});
              var cartItem = this.state.user.cart;
              var count =0
              cartItem.map( res => (
                count=count+1
              ))
              this.setState({count});
              console.log(count)
            })
    }
    
    render() {
        const { isAuthenticated, user, userdata } = this.props.auth;
        var cart=true
        if(this.state.count===0){
          cart= false
        }
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a
                    to = '/cart'
                    className="nav-link"
                    >
                    {cart ? <Link className="nav-link" to= "/cart"><p>cart <span class="badge badge-pill badge-success">{this.state.count}</span></p></Link> : <p>empty cart</p>}
                    </a>
              </li>
              <li className="nav-item">
                <a
                  href=""
                  onClick={this.onLogoutClick.bind(this)}
                  className="nav-link"
                >
                  <img
                    className="rounded-circle"
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: '25px', marginRight: '5px' }}
                    title="You must have a Gravatar connected to your email to display an image"
                  />{' '}
                  Logout
                </a>
              </li>
            </ul>
          );
      
          const guestLinks = (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          );
        return (
            <div>
                 <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                    <Link className="navbar-brand" to="/">Book-S</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="search"> Search
                            </Link>
                        </li>
                        </ul>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                    </div>
                </nav>
            </div>
        )
    }
}


Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    auth: state.auth
});
  
export default connect(mapStateToProps, { logoutUser })(Navbar);