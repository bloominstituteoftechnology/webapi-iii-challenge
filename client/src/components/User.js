import React from 'react';

const User = props => {
	const { user } = props;
	return(
		<div>
			<p>ID: { user.id }</p>
			<p>Name: { user.name }</p>
		</div>
	);
}

export default User;
