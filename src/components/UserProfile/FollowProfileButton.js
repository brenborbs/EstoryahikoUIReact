import React, { Component } from "react";
import { follow, unfollow } from "../../actions/UserActions"; // ok
import styled from "@emotion/styled";

class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow);
  };

  unfollowClick = () => {
    this.props.onButtonClick(unfollow);
  };

  render() {
    return (
      <>
        {!this.props.following ? (
          <BtnFollow onClick={this.followClick}>follow</BtnFollow>
        ) : (
          <BtnUnfollow onClick={this.unfollowClick}>UnFollow</BtnUnfollow>
        )}
      </>
    );
  }
}

export default FollowProfileButton;

const BtnFollow = styled("button")`
  padding: 8px;
  font-size: 14px;
  color: white;
  text-transform: uppercase;
  background-color: #4267b2;
  border-color: transparent;
  border-radius: 5px;
  text-shadow: 1px 1px 2px black;
`;
const BtnUnfollow = styled("button")`
  padding: 8px;
  font-size: 14px;
  color: white;
  text-transform: uppercase;
  background-color: #4267b2;
  border-color: transparent;
  border-radius: 5px;
  text-shadow: 1px 1px 2px black;
`;
