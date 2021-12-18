import { connect } from 'react-redux';
import React, { Component } from 'react'
import {Button, Form, FormGroup,Modal, ModalBody,
     Label, Input,ModalFooter} 
     from 'reactstrap';
import {searchUser,clearErrors} from '../actions/searchActions'

class AddContact extends Component {
    state={
        userSearched:'',
        modalOpen:false
    }

    toggle=()=>{
        this.setState({
            modalOpen:!this.state.modalOpen
        })
        this.props.clearErrors()
    }

    searchUser=()=>{
        this.props.clearErrors()
        if(this.state.userSearched!=='')
            this.props.searchUser(this.state.userSearched)
    }

    onChange=(e)=>{
        this.setState({
            userSearched:e.target.value
        })
    }
    render() {
        return (
            <div id="add-contact">
                <button 
                onClick={this.toggle}>
                    Add Contact
                </button>

                 <Modal
                 isOpen={this.state.modalOpen}
                 toggle={this.toggle}>
                 <ModalBody>
                <Form>
                 <FormGroup>
                    <Label for="userSearched">
                    Search by username
                    </Label>
                    <Input
                    onChange={this.onChange}
                    valid ={this.props.userFound}/>
                    
                </FormGroup>
                <Button onClick={this.searchUser}>Search</Button>
                </Form>
                 </ModalBody>
                 <ModalFooter>
                    {this.props.userFound?
                 <Button 
                    color="primary"
                    onClick={this.toggle}>
                    Add Contact
                </Button>:''}
                        {this.props.error}
                 </ModalFooter>
               </Modal>
                
            </div>
        )
    }
}
const mapStateToProps=state=>({
    userFound:state.search.userFound,
    error:state.search.error
})
export default connect(mapStateToProps,{searchUser,clearErrors})(AddContact);