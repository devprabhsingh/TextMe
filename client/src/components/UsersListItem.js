import React, {useEffect, useState, Fragment } from 'react'
import {showUser} from '../actions/userActions'
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
        props.showUser(props.user)
    }
        
        return (
            <Fragment>
            <div className="list-item"
                onClick={onClick}>
               <div className="profile-section">
                    <img alt="img" src="https://dsx.weather.com/util/image/w/en-ca-waterfrontdec28.jpg?v=at&w=485&h=273&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0"/>
                    <div>
                       <span className="username">{props.user.username}</span><br/>
                      
                        <span className="status">{status}</span>
                        
                        
                        
                    </div>
               </div>
            </div>
           
          </Fragment>
        )
    }


export default connect(null,{showUser})(UsersListItem)