import React, { Fragment } from 'react';

// Components
import User from './User';

const UserList = props => {
	const { users } = props;
	return(
		<Fragment>
			{ users.map((user, i) => <User key = { i } user = { user } />) }
		</Fragment>
	);
};

export default UserList;
