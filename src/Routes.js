import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Register from "./pages/Signup";
import Signin from "./pages/Signin";
import SinglePost from "./components/Posts/SinglePost";
import PrivateRoute from "./auth/PrivateRoute";
import NewPost from "./components/CRUD/CreatePost";
import CreateCategory from "./components/CRUD/CreateCategory";
import EditPost from "./components/CRUD/EditPost";
import UserProfile from "./components/UserProfile/main";
import EditProfile from "./components/Profile/EditProfile";
import Users from "./pages/Users";
import Admin from "./components/Admin";
// import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

// New Posts
import Posts from "./pages/Posts";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/post/:postId" component={SinglePost} />
        <Route exact path="/users" component={Users} />
        <PrivateRoute exact path="/newPost" component={NewPost} />
        <PrivateRoute exact path="/admin" component={Admin} />
        <PrivateRoute
          exact
          path="/admin/create-category"
          component={CreateCategory}
        />
        <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
        <PrivateRoute exact path="/user/:userId" component={UserProfile} />
        <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
      </Switch>
    </Layout>
  );
};

export default Routes;
