import React, { Component } from 'react'
import {connect} from 'react-redux'
import NavbarHeader from './NavbarHeader'
import UsersList from './UsersList'
import Video from './Video'
import io from 'socket.io-client'
import Peer from 'peerjs'
import ChatRoom from './ChatRoom'
import {getAllUsers,saveUsersList} from '../actions/chatActions'
import {addMsg,setSocket,savePeer,savePeerList,toggleVideoContainer,
    toggleChatRoom} from '../actions/chatActions'

class Home extends Component{

    state={
        call:null
    }

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
                port:"5000"
            })
            this.props.savePeer(peer)
    
            // initiating peer conn with server
            peer.on('open',(peerId)=>{
                socket.emit('newConn',peerId,this.props.user.email)
            })
    
            // getting peerList from server
            socket.on('peerList',(peerList)=>{
              this.props.savePeerList(peerList)
            })
    
            //listening to call from server 
            peer.on("call", (call) => {  
            this.setState({
                call
            })
            this.props.toggleVideoContainer(true,'incoming')
            this.props.toggleChatRoom(false) 
            
        })

    }

    render() {

        return (
            <div id="home">
                <NavbarHeader/>
                <main>
                <UsersList usersList={this.props.usersList}/>
                {this.props.showVideo?
                <Video call={this.state.call}/>:''}
               {this.props.showChatRoom?
               <ChatRoom />:''}

                {this.props.showVideo===false && this.props.showChatRoom===false?
               <p>To start chat select any contact from left</p>:''}
                </main>
            </div>
        )
    }
}

const mapStateToProps = state =>({
  usersList:state.chat.usersList,
  user:state.auth.user,
  showChatRoom:state.chat.showChatRoom,
  showVideo:state.chat.showVideo,

})
export default connect(mapStateToProps,
    {getAllUsers,saveUsersList,addMsg,setSocket,savePeer,savePeerList,
    toggleVideoContainer,toggleChatRoom}
    )(Home);
