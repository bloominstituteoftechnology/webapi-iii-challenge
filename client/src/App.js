import React, { Component } from 'react';

import styled from 'styled-components';

const AppDiv = styled.div`
	header {
		h1 {
			font-size: 2rem;
		}
	}
`;

export default class App extends Component {
	render() {
		return (
			<AppDiv>
				<header>
					<h1>Node Blog</h1>
				</header>
			</AppDiv>
		);
	}
};
