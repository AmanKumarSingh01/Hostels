import React, { Component } from 'react';
import {Provider} from 'react-redux'
import store from './Store'
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import {BrowserRouter as Router ,Route} from 'react-router-dom'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar/>
            <Route exact path="/" component= {Landing}/>
            <div>
              <Route exact path="/login" component= {Login}/>
              <Route exact path="/register" component= {Register}/>
            </div>
        </div>
      </Router>
      </Provider>
      
    )
  }
}

export default App;
