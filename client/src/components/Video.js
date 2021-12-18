import React from 'react'
import {connect} from 'react-redux'

class Video extends React.Component{

    render(){
        return(
            <div id="video-container">
                calling{this.props.userInChat.username}
            </div>
        )
    }
}
const mapStateToProps=state=>({
    userInChat:state.user.userInChat,
    
})

export default connect(mapStateToProps,null)(Video)