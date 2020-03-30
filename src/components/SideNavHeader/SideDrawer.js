import React from "react";
import SideNav from "react-simple-sidenav";
import SidenavItems from "./SideNavItems";

const SideDrawer = props => {
  return (
    <SideNav
      showNav={props.showNav}
      onHideNav={props.onHideNav}
      navStyle={{
        background: "#fff",
        maxWidth: "220px"
      }}
    >
      <SidenavItems />
    </SideNav>
  );
};

export default SideDrawer;
