import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import UserInfo from './UserInfo';  
import UserList from './UserList'; 

export default () => (
<BrowserRouter>
    <Switch>
      <Route exact path="/" component={UserList}/>
      <Route path="/users/:id" component={UserInfo}/>
    </Switch>
</BrowserRouter>
);