import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../actions/AuthActions";
// import Signin from "../pages/Signin";
import logo from "../resources/fakebook.png";

const Menu = ({ history }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [smallOpen, setSmallOpen] = useState(false);

  const toggle = () => {
    setNavOpen(!navOpen);
  };
  const toggleSmall = () => {
    setSmallOpen(!smallOpen);
  };
  return (
    <header id="header">
      <nav>
        <div id="nav-top">
          <Link to="/">
            <img src={logo} alt="logo" className="nav__logo" />
          </Link>
          <div id="menu-btn" onClick={toggle}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>

        <ul id="links" className={navOpen ? "show" : "hide"}>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/posts">Posts</Link>
          </li>

          <li>
            <Link to="/users">Find People</Link>
          </li>

          {/* {isAuthenticated() && isAuthenticated().user.role === "admin" && (
            <>
              <li>
                <Link to={`/admin`}>Admin</Link>
              </li>

              <li>
                <Link to={`/admin/create-category`}>Add Category</Link>
              </li>
            </>
          )} */}

          {/* {!isAuthenticated() && (
            <>
              <li>
                <Link to="/signin">Login</Link>
              </li>
            </>
          )} */}

          {isAuthenticated() && (
            <>
              <li>
                <Link to={`/newPost`}>New Post</Link>
              </li>
              {/* <li
                className="btn_logout"
                onClick={() => signout(() => history.push("/"))}
              >
                <span className="fa fa-sign-out"></span> Sign Out
              </li> */}
            </>
          )}
          {isAuthenticated() && (
            <li>
              <Link to={`/user/${isAuthenticated().user._id}`}>
                {`${isAuthenticated().user.name}'s profile`}
              </Link>
            </li>
          )}
          {/* Sublinks */}
          <li onClick={toggleSmall}>
            {!isAuthenticated() && (
              <>
                <p>
                  {" "}
                  Login <i className="fa fa-angle-double-down"></i>
                </p>
              </>
            )}
            {isAuthenticated() && (
              <li>
                <p>
                  Tools <i className="fa fa-angle-double-down"></i>
                </p>
              </li>
            )}
            <ul id="submenu" className={smallOpen ? "submenuOpen" : null}>
              <li>
                <Link style={{ textAlign: "left" }} to="/contact">
                  Contact
                </Link>
              </li>
              {!isAuthenticated() && (
                <li>
                  <Link style={{ textAlign: "left" }} to="/signin">
                    Login
                  </Link>
                </li>
              )}

              {isAuthenticated() && isAuthenticated().user.role === "admin" && (
                <>
                  <li>
                    <Link style={{ textAlign: "left" }} to={`/admin`}>
                      Admin
                    </Link>
                  </li>

                  <li>
                    <Link
                      style={{ textAlign: "left" }}
                      to={`/admin/create-category`}
                    >
                      Add Category
                    </Link>
                  </li>
                </>
              )}
              {isAuthenticated() && (
                <li
                  className="btn_logout"
                  style={{ textAlign: "left" }}
                  onClick={() => signout(() => history.push("/"))}
                >
                  <span className="fa fa-sign-out"></span> Sign Out
                </li>
              )}
            </ul>
          </li>
          {/* Sublinks */}
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(Menu);
