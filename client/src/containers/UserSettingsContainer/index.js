import React from 'react';
import {
  Button,
  ButtonGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
}
from 'reactstrap';

import { Link } from 'react-router-dom';
import EditProfile from '../../components/EditProfile/';

class UserSettingsContainer extends React.Component {
    constructor() {
      super();

      this.state = {
        isOpen: false,
        modal: false
      }
    }
    toggle = () => {
      return this.setState({
        isOpen: !this.state.isOpen
      })
    }

    toggleEditProfile = () => {
      return this.setState({
        modal: !this.state.modal
      })
    }

  render () {
    return (
      <ButtonGroup vertical style={{width: '100%', position: 'sticky', top: '50px'}}>
        <h3>Profile Settings</h3>
    <EditProfile isOpen={this.state.modal}></EditProfile>
        <Link to='/create/post/' style={{width: '100%'}}>
          <Button outline color='info'>Create New Post</Button>
        </Link>
        <ButtonDropdown
          isOpen={this.state.isOpen}
          toggle={this.toggle}
        >
          <DropdownToggle caret>More</DropdownToggle>
        <DropdownMenu style={{width: '100%', backgroundColor: 'gray'}}>
            <DropdownItem>Logout</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </ButtonGroup>
    )
  }
}

export default UserSettingsContainer;
