import React,{Component, Fragment} from 'react'
import {logout} from '../../actions/authActions'
import {connect} from 'react-redux'

class Logout extends Component{
    render(){
        return(
            <Fragment>
                <button id="logout-btn" onClick={this.props.logout} href="#">
                    Logout
                </button>
            </Fragment>
        )
    }
}

export default connect(
    null,
    {logout}
)(Logout)