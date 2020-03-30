import React, { Component } from 'react'

export default class TabFollwers extends Component {
  render() {
    const { followers } = this.props;
    return (
      <>
       <h3 className="mb-0">{followers.length}</h3>
        <small>Followers</small> 
      </>
    )
  }
}
