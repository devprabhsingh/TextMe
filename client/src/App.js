import React, { Component } from 'react'
import Auth from './components/Auth'
import Home from './components/Home'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {connect} from 'react-redux'
import {loadUser} from './actions/authActions'

class App extends Component {


  componentDidMount(){
    this.props.loadUser()
  
  }
    render() {
      
        return (
          <div id="app">
          {!this.props.isAuthenticated?
          <Auth/>
          :
          <Home/>}
          </div>
            
        )
    }
}
const mapStateToProps = state=>({
  isAuthenticated:state.auth.isAuthenticated,
  user:state.auth.user
})
export default connect(mapStateToProps,{loadUser})(App);