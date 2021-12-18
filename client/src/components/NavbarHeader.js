import React, { Component,Fragment } from 'react'
import Login from './auth/Login'
import Logout from './auth/Logout'
import Register from './auth/Register'
import AddContact from './AddContact'
import {connect} from 'react-redux'
import Notification from './Notification'
import EditProfile from './EditProfile'

class NavbarHeader extends Component {

    state = {
        isOpen:false,
        notify:false,
        showEditProfile:false
      }

    componentDidUpdate(prevProps){
      if(prevProps.msgList.length!==this.props.msgList.length){
          this.setState({
            notify:true
          })
      }
    }
      toggle =() =>{
        this.setState({
          isOpen: !this.state.isOpen
        })
      }

    loadEditProfile=()=>{
      this.setState({
        showEditProfile:true
      })
    }
    
    closeEditProfile=()=>{
      this.setState({
        showEditProfile:false
      })
    }
    
    render() {

        const authLinks = (
            <Fragment>   
                <div className="dropdown">
                  <button className="dropbtn">
                  {this.props.user ? "Welcome "+this.props.user.username : ''}
                  </button>
                  <div className="dropdown-content">
                  <button onClick={this.loadEditProfile}>Edit profile</button>
                  </div>
                </div>                               
              <AddContact/>
              <Logout/>
              {this.state.notify
                ? <Notification
                    msgList={this.props.msgList}
                    user={this.props.user}
                    userInChat={this.props.userInChat}/>:""}
            </Fragment>
          )
    
          const guestLinks = (
            <Fragment>
              <Register/>
              <Login/>
            </Fragment>)

        return (
          <Fragment>
            <div id="nav">
              <h2>TextMe</h2>           
              {this.props.isAuthenticated? authLinks:guestLinks}
            </div>
            {this.state.showEditProfile===true?
            <EditProfile user={this.props.user}
            closeEditProfile={this.closeEditProfile}/>:''}
          </Fragment>
        )
    }
}
const mapStateToProps = state=>({
    user:state.auth.user,
    isAuthenticated:state.auth.isAuthenticated,
    userInChat:state.user.userInChat.email,
    msgList:state.chat.msgList,
  })

export default connect(mapStateToProps,null)(NavbarHeader)