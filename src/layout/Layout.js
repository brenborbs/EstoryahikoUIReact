import React from "react";
// import styled from "@emotion/styled";
// import { useTheme } from "../ThemeContext";
// import Navbar from "../layout/Navbar";
import SideNavBar from "../components/SideNavHeader";

const Layout = props => {
  return (
    <React.Fragment>
      <SideNavBar />
      <div>{props.children}</div>
    </React.Fragment>
  );
};

export default Layout;
