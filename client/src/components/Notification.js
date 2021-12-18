import React, { Component } from 'react'

export default class Notification extends Component {
    render() {
        const last = (this.props.msgList).length-1
        const sender = this.props.msgList[last].sender
        const username =  (sender!==this.props.user.email &&
            sender!==this.props.userInChat)?
            this.props.msgList[last].senderName:''

        const data = username?(<div id="notification-box">
                    <span>{username}</span> messaged you!
                    </div>):''
        return (
            data      
        )
    }
}
