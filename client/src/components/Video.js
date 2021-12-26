import React from 'react'
import {connect} from 'react-redux'
import {insertToDom} from '../utils/commonUtils'
import {setUserInChat,toggleChatRoom,toggleVideoContainer} from '../actions/chatActions'

class Video extends React.Component{

    state={
        myStream:null
    }

    componentDidMount(){
        if(this.props.callType==='outgoing'){

        const {enableVideo} = this.props
        const [cUser] = this.props.cUsersList.filter(user=>user.email===this.props.userInChat.email)
        this.props.socket.emit('enableVideo',this.props.enableVideo,cUser.id)

        const [user] = this.props.peerList.filter(user=>user.email===this.props.userInChat.email)

        navigator.mediaDevices.getUserMedia({
            audio: true,video: enableVideo})
            .then((myStream) => {
          
               this.setState({
                   myStream
               })
                insertToDom(myStream,true,enableVideo)

                //making video call to other user
                const call = this.props.peer.call(user.peerId,myStream)
                call.on('stream',(userVideoStream)=>{
                    insertToDom(userVideoStream,false,enableVideo)
                })
            })
            .catch(e=>console.log(e))
        }

        if(window.innerWidth<600){
            document.getElementById('users-list').style.display="none"
        }   

        if(this.props.callType==='incoming'){

            navigator.mediaDevices.getUserMedia({
                audio: true,video: this.props.enableVideo})
                .then((myStream) => {
                   this.setState({
                       myStream
                   })
                   insertToDom(myStream,true,this.props.enableVideo)
                })
        }
        }

    answerCall=()=>{
            this.props.call.answer(this.state.myStream)
            this.props.call.on("stream", (userVideoStream) => {
                const child = document.getElementById('otheruservideo')
                if(!document.getElementById('video-container').contains(child)){
                insertToDom(userVideoStream,false,this.props.enableVideo)
                }
            })
    }

    endCall=()=>{
        this.state.myStream.getTracks().forEach(track => track.stop());  
        this.props.peer.destroy()
        this.props.toggleVideoContainer(false,'')
        this.props.setUserInChat(this.props.userInChat)
        this.props.toggleChatRoom(true)
        
    }
    render(){
        let user = this.props.userInChat
        if(this.props.callType==='incoming'){
        const [caller] = this.props.peerList.filter(peer=>peer.peerId===this.props.call.peer)
        const callingUser = this.props.usersList.filter(user=>user.email===caller.email)
        user = callingUser[0]
        }
        return(
            <div id="video-container">
               <div id="pos-abs-box">
               <div id="user-profile">
                   <img alt="profilepic" src={user.profilePic}/>
                   <p>{user.username}</p>
               </div>

                <div id="call-buttons">
                    {this.props.callType==='incoming'?
                    <div
                    onClick={this.answerCall}>
                    Answer</div>:''}

                    <div
                    onClick={this.endCall}>
                    Hang Up</div>
                </div>
               </div>
            </div>
        )
    }
}
const mapStateToProps=state=>({
    usersList:state.chat.usersList,
    cUsersList:state.chat.cUsersList,
    peerList:state.chat.peerList,
    userInChat:state.chat.userInChat,
    callType:state.chat.callType,
    peer:state.chat.peer,
    socket:state.chat.socket,
    enableVideo:state.chat.enableVideo
})

export default connect(mapStateToProps,{toggleChatRoom,toggleVideoContainer,setUserInChat})(Video)