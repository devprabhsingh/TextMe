import { connect } from 'react-redux';
import React, { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import {register,clearErrors} from '../../actions/authActions'

class Register extends Component {

    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();
        this.state = {
            username:"",
            email:"",
            password:"",
        }
      }

    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit =(e)=>{
        e.preventDefault()
        if (this.validator.allValid()){

            const {username,email,password} = this.state

            this.props.register({username,email,password})
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }

    }

    render() {
        const errorMsg = this.props.error
        return (
                <form id="register-form" onSubmit={this.onSubmit}>
                    <p>{errorMsg}</p>
                <input type="text" name="username" value={this.state.username} onChange={this.onChange} placeholder="Set a Username"/>
                {this.validator.message('username', this.state.username, 'required|min:5|max:12|alpha_num')}

                <input type="text" name="email" value={this.state.email} onChange={this.onChange} placeholder="Enter your email"/>
                {this.validator.message('email', this.state.email, 'required|email')}

                <input type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Set a password"/>
                {this.validator.message('password', this.state.password, 'required|alpha_num_dash|min:5|max:20')}

                <input type="submit" value="Register"/>

                </form>
        )
    }
}
const mapStateToProps=state=>({
    error:state.auth.error,
    isAuthenticated:state.auth.isAuthenticated
})
  
export default connect(mapStateToProps,{register,clearErrors})(Register)