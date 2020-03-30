import React, { Component } from "react";

export default class TabFollowing extends Component {
  render() {
    const { following } = this.props;
    return (
      <>
        <div className="profile-card-inf__title">{following.length}</div>
        <div className="profile-card-inf__txt">Following</div>
      </>
    );
  }
}
