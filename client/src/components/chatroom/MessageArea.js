import { connect } from 'react-redux'
import React, { Component } from 'react'

class MessageArea extends Component {

    componentDidUpdate(prevprops){
        if(prevprops.msgList.length!==this.props.length){
            const elem = document.getElementById('message-area');
            elem.scrollTop = elem.scrollHeight;
        }
    }
    render() {
        const {msgList,userLogged,userInChat} = this.props
        
        return (
            <div id="message-area">
                {msgList.filter(msg =>
                 (msg.sender===userLogged.email &&
                    msg.reciever===userInChat.email)
                    ||
                    (msg.sender===userInChat.email &&
                    msg.reciever===userLogged.email)
                ).map((filteredMsg,index) =>

                      filteredMsg.sender===userLogged.email?
                        (<div className="sentMsg" key={index}>
                      <p>{filteredMsg.msg}<sub>{filteredMsg.time}</sub></p>
                      </div>)
                      :
                      (<div className="recievedMsg" key={index}>
                      <p>{filteredMsg.msg}<sub>{filteredMsg.time}</sub></p>
                      </div>)
                      
                )}   
                     
                    
                
               
            </div>
        )
    }
}

const mapStateToProps=state=>({
    msgList:state.chat.msgList,
    userLogged:state.auth.user,
    userInChat:state.chat.userInChat
})
export default connect(mapStateToProps,null)(MessageArea)