import React, { Component } from 'react'
import UsersListItem from './UsersListItem'
import {connect} from 'react-redux'
import {getAllUsers} from '../actions/userActions'

class UsersList extends Component {

    componentDidMount(){
        this.props.getAllUsers()
    }

    render() {
        const {usersList,error} = this.props
        const filteredUsersList = usersList.filter(user=>user.email!==this.props.userLogged.email)
        return (
            <div id="users-list">
                <h2>Contacts</h2>
                {usersList ?
                filteredUsersList.map((user,index)=>{
                   return <UsersListItem key={index} user={user} cUsersList={this.props.cUsersList}/>
                })
                :
                error}
                
               
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    userLogged:state.auth.user,
    usersList:state.user.usersList,
    error:state.user.error,
    cUsersList:state.user.cUsersList
})

export default connect(mapStateToProps,{getAllUsers})(UsersList)