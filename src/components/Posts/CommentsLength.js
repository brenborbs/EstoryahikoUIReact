import React, { Component } from "react";
import { isAuthenticated } from "../../actions/AuthActions";

export default class CommentsLength extends Component {
  render() {
    const { comments } = this.props;
    return <>{comments.length}</>;
  }
}
