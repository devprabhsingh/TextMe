import { connect } from 'react-redux'
import React, { Component, Fragment } from 'react'
import {sendMsg} from '../../actions/chatActions'
import EmojiPicker from "react-emoji-search"

class ChatRoomFooter extends Component {
    state={
        text:'',
        showEmoji:false
    }

    componentDidMount(){
        document.getElementById("chat-msg-input").focus()
    }
    onChange=(e)=>{
        this.setState({
            text:e.target.value
        })
    }

    checkSubmit=(e)=>{
        if(e.keyCode===13 || e.code==='Enter'){
            this.submitMsg()        
        }
    }

    submitMsg=()=>{
        this.toggleEmojiBox(false)
        if(this.state.text!==''){
            const msg = this.state.text
            const {email,username} = this.props.sender
            const reciever = this.props.reciever
            const d = new Date()
            let hrs = d.getHours()>12? d.getHours()-12:d.getHours()
            if(d.getHours()===0)
                hrs=12 
            
            let mins = d.getMinutes()<10?"0"+d.getMinutes():d.getMinutes()

            const amorpm = d.getHours()>12? "pm":"am"
            const time = hrs+":"+mins+amorpm

            const recieverUser=this.props.cUsersList.filter(user=>user.email===this.props.reciever)
            let recieverId=""
            if(recieverUser.length===0)
                recieverId="offline"
            else
                recieverId=recieverUser[0].id

            const msgObj = {
                msg,
                time,
                sender:email,
                senderName:username,
                reciever,
                recieverId
            }

            this.props.sendMsg(msgObj)
            this.setState({
                text:''
            })
        }
        else
            alert('please type something')
    }

    toggleEmojiBox=(choice)=>{
        if (choice!==''){
            this.setState({
                showEmoji:choice
            })
        }else{
            this.setState({
                showEmoji:!this.state.showEmoji
            })
        }
       
    }

    addEmoji=(emoji)=>{
        this.setState({
            text:this.state.text+emoji
        })
    }
    render() {
        return (
            <Fragment>
            <div id="chat-room-footer">  
                <i className='far fa-smile'
                onClick={this.toggleEmojiBox}></i>     
                    <input 
                    placeholder="Type your message.."
                    type="text"
                    value={this.state.text}
                    onChange={this.onChange}
                    onKeyPress={this.checkSubmit}
                    id="chat-msg-input"/>
                    <i 
                    className="fas fa-paper-plane"
                    onClick={this.submitMsg}></i>
            </div>
             {this.state.showEmoji?   
                <EmojiPicker
                onEmojiClick={(emoji)=>{
                    this.addEmoji(emoji)
                }}/>:''}
                </Fragment>
        )
    }
}
const mapStateToProps = state=>({
    sender:state.auth.user,
    reciever:state.chat.userInChat.email,
    cUsersList:state.chat.cUsersList
})
export default connect(mapStateToProps,{sendMsg})(ChatRoomFooter)