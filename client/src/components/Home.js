import React, { Component } from 'react'
import {connect} from 'react-redux'
import NavbarHeader from './NavbarHeader'
import UsersList from './UsersList'
import Video from './Video'
import io from 'socket.io-client'
import Peer from 'peerjs'
import ChatRoom from './ChatRoom'
import {getAllUsers,saveUsersList} from '../actions/userActions'
import {addMsg,setSocket,savePeer,savePeerList,showVideoContainer} from '../actions/chatActions'
import {addVideo} from '../utils/videoUtils'

class Home extends Component{

    componentDidMount(){
        this.props.getAllUsers()

        const socket = io('/')
        this.props.setSocket(socket)
        socket.emit('email',this.props.user.email)
        socket.on('usersList',usersList=>this.props.saveUsersList(usersList))
        socket.on('message',msg=>this.props.addMsg(msg))
    
         //creating peer connection to server
            const peer = new Peer(undefined,{
                path:"/peerjs",
                host:"/",
                port:""
            })
            this.props.savePeer(peer)
    
            // initiating peer conn with server
            peer.on('open',(peerId)=>{
                socket.emit('newConn',peerId,this.props.user.email)
            })
    
            // getting peerList from server
            socket.on('peerList',(peerList)=>{
            console.log(peerList)
              this.props.savePeerList(peerList)
            })
    
            //listening to call from server 
            peer.on("call", (call) => {  
            console.log('call recieved') 
            this.props.showVideoContainer()   
            navigator.mediaDevices.getUserMedia({
                audio: true,video: true,})
                .then((stream) => { 
                addVideo(stream,true)
                call.answer(stream)
                console.log(stream)
                call.on("stream", (userVideoStream) => {
                    console.log(userVideoStream)
                    addVideo(userVideoStream,false)
                })
            }).catch(e=>console.log(e))
        })

    }

    render() {

        return (
            <div id="home">
                <NavbarHeader/>
                <main>
                <UsersList usersList={this.props.usersList}/>
                {this.props.showVideo?
                <Video/>:''}
               {this.props.isChatRoomOpen?
               <ChatRoom />
               :
               <p>To start chat select any contact from left</p>}
                </main>
            </div>
        )
    }
}

const mapStateToProps = state=>({
  usersList:state.user.usersList,
  socket:state.chat.socket,
  user:state.auth.user,
  isChatRoomOpen:state.user.isChatRoomOpen,
  showVideo:state.chat.showVideo,
  cUsersList:state.user.cUsersList

})
export default connect(mapStateToProps,
    {getAllUsers,saveUsersList,addMsg,setSocket,savePeer,savePeerList,
    showVideoContainer}
    )(Home);
