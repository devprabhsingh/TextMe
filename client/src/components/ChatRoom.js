import React, { Component } from 'react'
import ChatRoomHeader from './chatroom/ChatRoomHeader'
import MessageArea from './chatroom/MessageArea'
import ChatRoomFooter from './chatroom/ChatRoomFooter'

export default class ChatRoom extends Component {
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
