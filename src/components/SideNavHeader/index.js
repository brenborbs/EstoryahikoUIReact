import { Link } from "react-router-dom";
import SideNav from "./SideDrawer";
import React, { Component } from "react";

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false
    };
    this.onHideNav = this.onHideNav.bind(this);
  }

  onHideNav() {
    this.setState({ showNav: false });
  }

  render() {
    return (
      <header>
        <div className="open_nav">
          <i
            className="fa fa-bars"
            aria-hidden="true"
            onClick={() => this.setState({ showNav: true })}
            style={{
              color: "#9649ff",
              padding: "18px 20px",
              cursor: "pointer",
              fontSize: "20px"
            }}
          />
        </div>
        <SideNav
          showNav={this.state.showNav}
          onHideNav={() => this.onHideNav()}
        />

        <Link to="/">
          <li className="logo" style={{ cursor: "pointer" }}>
            Estoryahi ko!
          </li>
        </Link>
      </header>
    );
  }
}
