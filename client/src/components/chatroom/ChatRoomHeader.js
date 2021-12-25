import React, { Component } from 'react'
import {connect} from 'react-redux'
import {toggleChatRoom,toggleVideoContainer} from '../../actions/chatActions'

class ChatRoomHeader extends Component {

    state={
        showBackButton:false
    }
    componentDidMount(){
        if(window.innerWidth<600){
            this.setState({
                showBackButton:true
            })   
        }
    }

    goBack=()=>{
        document.getElementById('users-list').style.display="block"
        this.props.toggleChatRoom(false)
    }

    doVideoCall=()=>{
        const user = this.props.peerList.filter(user=>user.email===this.props.userInChat.email)
        // if user means user is in current users list means online
        if(user.length!==0){

            //show videocall component
            this.props.toggleVideoContainer(true,'outgoing')
            this.props.toggleChatRoom(false)

          
        
        }else alert(`${this.props.userInChat.username} is not online`)
        
    }
    render() {
        const username = this.props.userInChat? this.props.userInChat.username:'username'
        return (
            <div 
            id="chat-room-header">
                <div id="profile">
                    {this.state.showBackButton?
                    <i className="fas fa-angle-left"
                       onClick={this.goBack}></i>:''}
                    <img alt="img" src="https://dsx.weather.com/util/image/w/en-ca-waterfrontdec28.jpg?v=at&w=485&h=273&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0"/>
                    <h3>{username}</h3>
                </div>
                <div id="options">
                <i className="fas fa-phone-alt"></i>
                <i 
                onClick={this.doVideoCall}
                className="fas fa-video"></i>
                <i className="fas fa-ellipsis-v"></i>
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