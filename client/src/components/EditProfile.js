import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {compressedFile} from '../utils/commonUtils'
import {loadUser} from '../actions/authActions'

class EditProfile extends Component {
    state={
        isDisabled:true,
        about:this.props.user.about,
        username:this.props.user.username,
        email:this.props.user.email,
        password:'*******',
        uploadedFile:'https://muscathome.com/uploads/profile_images/default.png',
        msg:''
    }

    componentDidMount(){
        if(this.props.user.about==="undefined"){
            this.setState({
                about:""
            })
        }
        if(this.props.user.profilePic!==undefined){
            this.setState({
                uploadedFile:this.props.user.profilePic
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

    saveChanges= async ()=>{
        const {user} = this.props
        if((user.username!==this.state.username ||
            user.about!==this.state.about) ||
            (user.email!==this.state.email ||
            this.state.file!=='')){
        
            const formData = new FormData()
            const uploadedImg = await compressedFile()
            this.setState({
                uploadedFile:uploadedImg
            })
           
        formData.append('profilePhoto',uploadedImg)
        formData.append('about',this.state.about)
        formData.append('username',this.state.username)
        formData.append('email',this.state.email)

        axios.post('/saveProfileChanges',formData, {
            headers:{
                'Content-Type': 'multipart/form-data',
                'x-auth-token':this.props.token
            }})
        .then(res=>{
           this.setState({
               msg:res.data.msg
           },()=>{
               this.props.loadUser()})
        })
        .catch(e=>{
            this.setState({
                msg:e.response.data.msg
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
            uploadedFile:URL.createObjectURL(e.target.files[0])
        })
    }

    closeProfileBox=()=>{
        this.props.closeEditProfile()
    }

    render() {
         let uploadedSrc=''
        if(this.state.uploadedFile!==undefined){
            uploadedSrc =this.state.uploadedFile
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

                    <img id="uploadedPic" alt="userPic" src={uploadedSrc}/>
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
export default connect(mapStateToProps,{loadUser})(EditProfile)