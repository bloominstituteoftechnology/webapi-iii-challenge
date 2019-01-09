import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Input } from 'reactstrap';

class EditProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      modal: false
    }
  }
  toggle = () => {
    return this.setState({
      modal: !this.state.modal
    })
  }
  render () {
    return (
      <section style={{width: '100%'}}>
      <Button outline color='primary' onClick={this.toggle}>Edit Profile Information</Button>
    <Modal isOpen={this.state.modal} toggle={this.toggle}>
      <ModalHeader toggle={this.toggle}>Edit Profile Information</ModalHeader>
      <Form onSubmit={this.updateUser}>
        <ModalBody>
          <Input type='text' name='name' />
        </ModalBody>
        <ModalFooter style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <Button color='success' type='submit'>SAVE</Button>
        <Button color='dark' onClick={this.toggle}>BACK</Button>
        </ModalFooter>
      </Form>
    </Modal>
    </section>
  )
  }
}

export default EditProfile;
