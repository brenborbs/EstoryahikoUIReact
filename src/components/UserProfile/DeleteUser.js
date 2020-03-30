import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../../actions/AuthActions";
import { remove } from "../../actions/UserActions";
import { signout } from "../../actions/AuthActions";
import styled from "@emotion/styled";

class DeleteUser extends Component {
  state = {
    redirect: false
  };

  deleteAccount = () => {
    const token = isAuthenticated().token;
    const userId = this.props.userId;
    remove(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        // signout user
        signout(() => console.log("User is deleted"));
        // redirect
        this.setState({ redirect: true });
      }
    });
  };

  deleteConfirmed = () => {
    let answer = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (answer) {
      this.deleteAccount();
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <BtnThrash
        className="fa fa-trash"
        onClick={this.deleteConfirmed}
      ></BtnThrash>
    );
  }
}

export default DeleteUser;

const BtnThrash = styled("button")`
  padding: 8px;
  font-size: 18px;
  text-transform: uppercase;
  color: white;
  background-color: #c32d0e;
  border-radius: 5px;
  border-color: transparent;
`;
