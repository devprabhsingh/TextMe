import React, { Component,Fragment } from 'react'
import {connect} from 'react-redux'
import Notification from './Notification'
import EditProfile from './EditProfile'
import {logout} from '../actions/authActions'

class NavbarHeader extends Component {

    state = {
        isOpen:false,
        notify:false,
        showEditProfile:false,
        profilePic:'https://muscathome.com/uploads/profile_images/default.png',
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
      console.log(this.props.user)
      const {username} = this.props.user
        return (
          <Fragment>
            <div id="nav">
              <h2>Interactly</h2>           
        
               <div className="dropdown">
               <div className="dropbtn">
               <img alt="profilepic" src={this.props.user.profilePic||
              this.state.profilePic}/>
                 {window.innerWidth>600? username :''}
               <i className="fas fa-pencil-alt"
               onClick={this.loadEditProfile}></i>
               </div>
             </div>
             <button id="logout-btn" onClick={this.props.logout} href="#">
             Logout
         </button>                            
            
           {this.state.notify? 
            (<Notification
                 msgList={this.props.msgList}
                 user={this.props.user}
                 userInChat={this.props.userInChat}/>):""}
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
    userInChat:state.chat.userInChat.email,
    msgList:state.chat.msgList,
  })

export default connect(mapStateToProps,{logout})(NavbarHeader)