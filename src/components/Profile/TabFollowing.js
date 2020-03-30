import React, { Component } from 'react'

export default class TabFollowing extends Component {
  render() {
    const { following } = this.props;
    return (
      <>
        <h3 className="mb-0">{following.length}</h3>
              <small>Following</small> 
      </>
    )
  }
}
