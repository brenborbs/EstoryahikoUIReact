import React, { Component } from "react";

export default class TabFollwers extends Component {
  render() {
    const { followers } = this.props;
    return (
      <>
        <div className="profile-card-inf__title">{followers.length}</div>
        <div className="profile-card-inf__txt">Followers</div>
      </>
    );
  }
}
