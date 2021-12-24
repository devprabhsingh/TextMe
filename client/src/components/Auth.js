import React, { Component } from 'react'
import Register from './auth/Register'
import Login from './auth/Login'

export default class Auth extends Component {
    state = {
      showRegister:false
    }

    toggle=(e)=>{
      if(e.target.id==="sign-up-btn"){
        this.setState({
          showRegister:true
        })
      }else{
        this.setState({
          showRegister:false
        })
       
      }    
    }


    render() {
        return (
            <div id="welcome-page">

            <h1>Interactly</h1>

            <div id="sign-btns">
              <button id="sign-up-btn" onClick={this.toggle}>
                Register   
              </button> 
              <button id="sign-in-btn" onClick={this.toggle}>
                Login     
              </button>
            </div>

          {this.state.showRegister? <Register/>:<Login/>}
            </div>
        )
    }
}
