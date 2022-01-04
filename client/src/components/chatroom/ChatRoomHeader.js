import React, { Component } from 'react'
import {connect} from 'react-redux'
import {toggleChatRoom,toggleVideoContainer} from '../../actions/chatActions'

class ChatRoomHeader extends Component {

    state={
        showBackButton:false,
        online:false
    }
    componentDidMount(){
        if(window.innerWidth<600){
            this.setState({
                showBackButton:true
            })   
        }

        const [user] = this.props.peerList.filter(user=>user.email===this.props.userInChat.email)
        if(user){
            this.setState({
                online:true
            })
        }
    }

    alertUser=()=>{
        alert('This feature is in development')
    }

    goBack=()=>{
        document.getElementById('users-list').style.display="block"
        this.props.toggleChatRoom(false)
    }

    doCall=(video)=>{
        console.log(video)
        if(this.state.online){
            this.props.toggleVideoContainer(true,'outgoing',video)
            this.props.toggleChatRoom(false)
        }else alert(`${this.props.userInChat.username} is not online`)   
    }

    render() {
        return (
            <div 
            id="chat-room-header">
                <div id="profile">
                    {this.state.showBackButton?
                    <i className="fas fa-angle-left"
                       onClick={this.goBack}></i>:''}
                    <img alt="img" src={this.props.userInChat.profilePic}/>
                    <h3>{this.props.userInChat.username}</h3>
                </div>
                <div id="options">
                <i className="fas fa-phone-alt"
                onClick={()=>{this.doCall(false)}}></i>
                <i 
                onClick={this.alertUser}
                className="fas fa-video"></i>
                <i className="fas fa-ellipsis-v"></i>
                <p>I hope you like it</p>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>({
    userInChat:state.chat.userInChat,
    peer:state.chat.peer,
    peerList:state.chat.peerList,
})
export default connect(mapStateToProps,{toggleVideoContainer,toggleChatRoom})(ChatRoomHeader)