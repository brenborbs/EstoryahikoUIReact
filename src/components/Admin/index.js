import React, { Component } from "react";
import AllUsers from "./AllUsers";
import AllPosts from "./AllPosts";

export default class Admin extends Component {
  render() {
    return (
      <section id="admin-page">
        <div className="admin-wrapper">
          <div className="column">
            <AllUsers />
          </div>
          <div className="column">
            <AllPosts />
          </div>
        </div>
      </section>
    );
  }
}
