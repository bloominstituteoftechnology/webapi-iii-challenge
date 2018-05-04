import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './UserForm.css';

const UserForm = props => {
  return (
    <Form onSubmit={props.addUser} className="userForm" inline>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="name" className="mr-sm-2">
          Name:
        </Label>
        <Input
          type="text"
          id="name"
          onChange={props.handleNewUser}
          placeholder="name"
          name="name"
          value={props.state.name}
          required
        />
      </FormGroup>
      <Button>Add New User</Button>
    </Form>
  );
};

export default UserForm;
