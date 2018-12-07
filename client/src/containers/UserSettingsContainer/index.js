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
class UserSettingsContainer extends React.Component {
    constructor() {
      super();

      this.state = {
        isOpen: false
      }
    }
    toggle = () => {
      return this.setState({
        isOpen: !this.state.isOpen
      })
    }

  render () {
    return (
      <ButtonGroup vertical color='light' style={{width: '100%', position: 'sticky', top: '50px'}}>
        <Button>Edit Profile Information</Button>
        <Button>Create New Post</Button>
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
