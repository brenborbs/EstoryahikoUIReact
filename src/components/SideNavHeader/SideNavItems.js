import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../actions/AuthActions";

const SideNavItems = ({ history }) => {
  const showItems = () => {
    return (
      <div className="side-nav-links">
        <ul>
          {isAuthenticated() && (
            <li>
              <Link to={`/user/${isAuthenticated().user._id}`}>
                {`${isAuthenticated().user.name}'s profile`}
              </Link>
            </li>
          )}
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/posts">Posts</Link>
          </li>

          <li>
            <Link to="/users">Find People</Link>
          </li>
          {!isAuthenticated() && (
            <>
              <li>
                <Link to="/signin">Login</Link>
              </li>
            </>
          )}
          {isAuthenticated() && isAuthenticated().user.role === "admin" && (
            <>
              <li>
                <Link to={`/admin`}>Admin</Link>
              </li>

              <li>
                <Link to={`/admin/create-category`}>Add Category</Link>
              </li>
            </>
          )}
          {isAuthenticated() && (
            <>
              <li>
                <Link to={`/newPost`}>New Post</Link>
              </li>
              <li
                className="btn_logout"
                style={{ color: "black", fontWeight: "600" }}
                onClick={() => signout(() => history.push("/"))}
              >
                <span className="fa fa-sign-out"></span>Log Out
              </li>
            </>
          )}
        </ul>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div>{showItems()}</div>
    </React.Fragment>
  );
};

export default withRouter(SideNavItems);
