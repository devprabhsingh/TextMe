import React, { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import {connect} from 'react-redux'
import {login} from '../../actions/authActions';

class Login extends Component {

    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();
        this.state = {
            email:"",
            password:""
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
            const {email,password} = this.state
            this.props.login({email,password})
        } else {
            this.validator.showMessages();
            this.forceUpdate();
          }

    }

    render() {
      const errorMsg = this.props.error
        return (
                <form id="login-form" onSubmit={this.onSubmit}>
                    <p>{errorMsg}</p>
                    <input type="text" name="email" 
                    value={this.state.email} 
                    onChange={this.onChange} 
                    placeholder="Enter your email"/>
                    {this.validator.message('email', this.state.email, 'required|email')}

                    <input type="password" name="password" 
                    value={this.state.password} 
                    onChange={this.onChange} 
                    placeholder="Enter your password"/>
                    {this.validator.message('password', this.state.password, 'required|alpha_num_dash|min:5|max:20')}

                    <input type="submit" text="Login"/>

                    </form>
        )
    }
}

const mapStateToProps=state=>({
  error:state.auth.error
})

export default connect(mapStateToProps,{login})(Login)