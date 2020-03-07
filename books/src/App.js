import React, { Component } from 'react';
import {Provider} from 'react-redux'
import jwt_decode from 'jwt-decode'

import store from './Store'
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import {BrowserRouter as Router ,Route} from 'react-router-dom'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import setAuthToken from './utlis/setAuthToken';
import { setCurrentUser, logoutUser, detailData } from './actions/authAction';
import search from './components/search/search';
import result from './components/Result/result';


//Check for tokan

if(localStorage.jwtToken){
  //Set Auth Token
  setAuthToken(localStorage.jwtToken);

  // Decode 

  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));
  store.dispatch(detailData(localStorage.jwtToken))
  const currentTime = Date.now()/1000;
  if(decoded.exp < currentTime){
    
    store.dispatch(logoutUser());

    //
    window.location.href = '/login'
  }
}



class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar/>
            <Route exact path="/" component= {Landing}/>
            <div className = "container">
              <Route exact path="/login" component= {Login}/>
              <Route exact path="/register" component= {Register}/>
              <Route exact path="/search" component= {search}/>
              <Route exact path="/result/:id" component= {result}/>
            </div>
        </div>
      </Router>
      </Provider>
      
    )
  }
}

export default (App);
