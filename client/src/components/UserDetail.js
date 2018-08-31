import React, { PureComponent } from "react";
import styled from "styled-components";
import Link from "react-router-dom/Link";
import posed from "react-pose";
import { primaryColor, secondaryColor } from "../styles";
import { UsersContainer as UC } from "../App";
import { Paper } from "./User";

const ListContainer = posed.div({
  enter: { staggerChildren: 50 },
  exit: { staggerChildren: 20, staggerDirection: -1 }
});

const UsersContainer = styled(ListContainer)`
  max-width: 50rem;
  margin: 4rem auto;
  position: relative;
`;

const SecondaryHeading = styled.h2`
  font-size: 2.4rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 3rem;
`;

const StyledLink = styled(Link)`
  background-color: ${secondaryColor};
  color: ${primaryColor};
  text-decoration: none;
  font-size: 1.6rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: inline-block;
  padding: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
`;

const PostPaper = Paper.extend`
  cursor: auto;
  padding: 5rem;
`;

class UserDetail extends PureComponent {
  state = {
    loading: true
  };

  componentDidMount() {
    this.props.fetchPosts(() => this.setState({ loading: false }));
  }
  render() {
    return (
      <UsersContainer>
        <StyledLink to="/">&larr; Back</StyledLink>
        <SecondaryHeading>
          {this.props.user && this.props.user.name}
        </SecondaryHeading>
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
          this.props.userPosts.map(post => (
            <PostPaper key={post.id}>{post.text}</PostPaper>
          ))
        )}
      </UsersContainer>
    );
  }
}

export default UserDetail;
