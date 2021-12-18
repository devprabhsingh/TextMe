import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class EditProfile extends Component {
    state={
        isDisabled:true,
        about:this.props.user.about,
        username:this.props.user.username,
        email:this.props.user.email,
        password:'*******',
        profilePic:this.props.user.profilePic,
        profilePicType:this.props.user.profilePicType,
        newProfilePic:null,
        msg:''
    }

    componentDidMount(){
        if(this.props.user.about==="undefined"){
            this.setState({
                about:""
            })
        }
    }
    onChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    edit=(e)=>{
        this.setState({
            isDisabled:false
        })
        e.target.parentElement.children[1].focus()
    }

    saveChanges=()=>{
        const {user} = this.props
        if((user.username!==this.state.username ||
            user.about!==this.state.about) ||
            user.email!==this.state.email){
        const formData = new FormData()
        formData.append('about',this.state.about)
        formData.append('username',this.state.username)
        formData.append('email',this.state.email)
        formData.append('profilePhoto',this.state.newProfilePic)

        axios.post('/saveProfileChanges',formData, {
            headers:{
                'Content-Type': 'multipart/form-data',
                'x-auth-token':this.props.token
            }})
        .then(res=>{
           this.setState({
               msg:res.data.msg
           })
        })
        .catch(e=>{
            this.setState({
                msg:e.response.msg
            })
        })
    }
    else{
        this.setState({
            msg:'No changes to be saved!'
        })
    }

    }

    handlePhoto=(e)=>{
        this.setState({
            newProfilePic: URL.createObjectURL(e.target.files[0]),
        })
    }

    closeProfileBox=()=>{
        this.props.closeEditProfile()
    }

    render() {
        let src=''
        if(this.state.profilePic){
        const profileImg = (this.state.profilePic).toString('base64')
        src = !this.state.newProfilePic?
        `data:image/${this.state.profilePicType};base64,${profileImg}`
        :this.state.newProfilePic
        }
        else{
            src="https://media.istockphoto.com/vectors/person-icon-flat-black-round-button-vector-illustration-vector-id1139505484?k=20&m=1139505484&s=170667a&w=0&h=uVTD_s2EnF35J7s0-4M-G3lcHbIVfmCAlu_y-jinq2c="
        }


        return (
            <div id="edit-profile">
                <i className="fas fa-times"
                onClick={this.closeProfileBox}></i>
                <label>
                    <input type="file"
                    accept=".png,.jpg,.jpeg"
                    id="profileImgInput"
                    onChange={this.handlePhoto}/>
                    <img src={src}/>
                </label>
                <div>
                <p>About</p>
                <input value={this.state.about}
                onChange={this.onChange}
                placeholder="Add your bio here"
                id="about"
                disabled={this.state.isDisabled}/>
                <i className="fas fa-pencil-alt"
                onClick={this.edit}></i>
                </div>

                <div>
                <p>Username</p>
                <input value={this.state.username}
                onChange={this.onChange}
                id="username"
                disabled={this.state.isDisabled}/>
                <i className="fas fa-pencil-alt"
                onClick={this.edit}></i>
                </div>

                <div>
                <p>Email</p>
                <input value={this.state.email}
                onChange={this.onChange}
                id="email"
                disabled={this.state.isDisabled}/>
                <i className="fas fa-pencil-alt"
                onClick={this.edit}></i>
                </div>

                <div>
                <p>Password</p>
                <input value={this.state.password}
                type="password"
                id="password"
                disabled/>
                </div>

                <button onClick={this.saveChanges}>
                    Save Changes
                </button>
                <p>{this.state.msg}</p>
            </div>
        )
    }
}
const mapStateToProps=(state)=>({
    token:state.auth.token
})
export default connect(mapStateToProps,null)(EditProfile)