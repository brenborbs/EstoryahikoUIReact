import React from "react";
// import styled from "@emotion/styled";
// import { useTheme } from "../ThemeContext";
// import Navbar from "../layout/Navbar";
// import SideNavBar from "../components/SideNavHeader";
import Navbar from "../layout/NewNavbar";
import styled from "@emotion/styled";

const Layout = props => {
  return (
    <React.Fragment>
      {/* <SideNavBar /> */}
      <Navbar />
      <Wrapper>{props.children}</Wrapper>
    </React.Fragment>
  );
};

export default Layout;

const Wrapper = styled("div")``;
