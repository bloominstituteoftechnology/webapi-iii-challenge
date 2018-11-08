import React from 'react';

const Card = (props) => {
	return (
		<div>
			{props.users.map((user) => {
				return (
					<div key={user.id}>
						<h3>{user.name}</h3>
					</div>
				);
			})}
		</div>
	);
};

export default Card;
