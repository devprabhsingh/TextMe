import React, { Component } from 'react'
import ChatRoomHeader from './chatroom/ChatRoomHeader'
import MessageArea from './chatroom/MessageArea'
import ChatRoomFooter from './chatroom/ChatRoomFooter'

export default class ChatRoom extends Component {

    componentDidMount(){
        if(window.innerWidth<600){
            document.getElementById('users-list').style.display="none"
        }
    }

    render() {
        return (
            <div id="chatroom">
                <ChatRoomHeader/>
                <MessageArea/>
                <ChatRoomFooter/>
            </div>
        )
    }
}
