import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../actions/AuthActions";

const NewNavbar = ({ history }) => {
  const [navOpen, setNavOpen] = useState(false);
  const toggle = () => {
    setNavOpen(!navOpen);
  };
  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <h4>Estoryahi Ko!</h4>
        </Link>
      </div>
      <ul className={navOpen ? "nav-active" : "nav-links"}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/users">People</Link>
        </li>
        {isAuthenticated() && (
          <>
            <li>
              <Link to={`/newPost`}>Create</Link>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <li>
            <Link to={`/user/${isAuthenticated().user._id}`}>
              {/* {`${isAuthenticated().user.name}'s profile`} */}
              Profile
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <li>
            <Link to="/signin">Login</Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === "admin" && (
          <>
            <li>
              <Link to={`/admin`}>Admin</Link>
            </li>

            <li>
              <Link to={`/admin/create-category`}>Category</Link>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <li className="logout">
            <button
              className="btn-logout"
              onClick={() => signout(() => history.push("/"))}
            >
              Sign Out
            </button>
          </li>
        )}
      </ul>
      <div className="burger" onClick={toggle}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default withRouter(NewNavbar);
