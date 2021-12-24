import React, {useEffect, useState, Fragment } from 'react'
import {toggleChatRoom,setUserInChat} from '../actions/chatActions'
import {connect} from 'react-redux'

function UsersListItem(props){

    const [status, setStatus] = useState('offline');

    useEffect(() => {
        const {user,cUsersList} = props
        const userArr = cUsersList.filter(u=>u.email===user.email)
        if(userArr.length===1){
            setStatus('online')
        }
      },[props])

    const onClick=()=>{
        props.setUserInChat(props.user)
        props.toggleChatRoom(true)
    }
        
        return (
            <Fragment>
            <div className="list-item"
                onClick={onClick}>
               <div className="profile-section">
                    <img alt="img" src={props.user.profilePic?
                        props.user.profilePic:
                        'https://muscathome.com/uploads/profile_images/default.png'}/>
                    <div>
                       <span className="username">{props.user.username}</span><br/>
                      
                        <span className="status">{status}</span>
                        
                        
                        
                    </div>
               </div>
            </div>
           
          </Fragment>
        )
    }


export default connect(null,{toggleChatRoom,setUserInChat})(UsersListItem)