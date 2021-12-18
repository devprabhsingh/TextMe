import React, { Component } from 'react'
import {connect} from 'react-redux'
import {showVideoContainer} from '../../actions/chatActions'
import { addVideo } from '../../utils/videoUtils'

class ChatRoomHeader extends Component {

    doVideoCall=()=>{
        const user = this.props.peerList.filter(user=>user.email===this.props.userInChat.email)
        // if user means user is in current users list means online
        if(user.length!==0){

            //show videocall component
            this.props.showVideoContainer()
            let myStream=null
            //streaming user video
            navigator.mediaDevices.getUserMedia(
                {video:true, audio:true})
                .then(stream=>{
    
                    if(stream.getVideoTracks().length > 0 && stream.getAudioTracks().length > 0){
                        myStream=stream
                        if(this.props.showVideo)
                        addVideo(stream,true)
                        console.log(myStream)
                        //making video call to other user
                        const call = this.props.peer.call(user[0].peerId,myStream)
                        call.on('stream',(userVideoStream)=>{
                            addVideo(userVideoStream,false)
                        })
                    }
                }).catch(err=>console.log(err))  
        
        }else alert(`${this.props.userInChat.username} is not online`)
        
    }
    render() {
        const username = this.props.userInChat? this.props.userInChat.username:'username'
        return (
            <div 
            id="chat-room-header">
                <div id="profile">
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
    userInChat:state.user.userInChat,
    peer:state.chat.peer,
    peerList:state.chat.peerList,
    showVideo:state.chat.showVideo
})
export default connect(mapStateToProps,{showVideoContainer})(ChatRoomHeader)