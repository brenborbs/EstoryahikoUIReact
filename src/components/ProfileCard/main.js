import React, { Component } from "react";
import { isAuthenticated } from "../../actions/AuthActions";
import { Redirect } from "react-router-dom";
import { read } from "../../actions/UserActions";
import DefaultProfile from "../../images/avatar.jpg";
import { listByUser } from "../../actions/PostActions";
import TabFollowers from "./TabFolllowers";
import TabFollowing from "./TabFollowing";

export default class HomeProfile extends Component {
  state = {
    user: { following: [], followers: [] },
    redirectToSignin: false,
    following: false,
    error: "",
    posts: []
  };

  // check follow
  checkFollow = user => {
    const jwt = isAuthenticated();
    const match = user.followers.find(follower => {
      // one id has many other ids (followers) and vice versa
      return follower._id === jwt.user._id;
    });
    return match;
  };

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        //console.log("ERROR")
        this.setState({ redirectToSignin: true });
      } else {
        // console.log(data)
        let following = this.checkFollow(data);
        this.setState({ user: data, following });
        this.loadPosts(data._id);
      }
    });
  };

  loadPosts = userId => {
    const token = isAuthenticated().token;
    listByUser(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  componentDidMount = () => {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    this.init(userId);
  };

  UNSAFE_componentWillReceiveProps = props => {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    this.init(userId);
  };

  render() {
    const { redirectToSignin, user, posts } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;

    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : DefaultProfile;

    return (
      <div className="profile-card js-profile-card">
        <div className="profile-card__img">
          <img src={photoUrl} alt={user.name} />
        </div>

        <div className="profile-card__cnt js-profile-cnt">
          <div className="profile-card__name">{user.name}</div>
          <div className="profile-card__txt">
            {user.about} <strong>{user.email}</strong>
          </div>
          <div className="profile-card-loc">
            <span className="profile-card-loc__icon"></span>

            <span className="profile-card-loc__txt">
              {`Joined ${new Date(user.created).toDateString()}`}
            </span>
          </div>

          <div className="profile-card-inf">
            <div className="profile-card-inf__item">
              <TabFollowers followers={user.followers} />
            </div>

            <div className="profile-card-inf__item">
              <TabFollowing following={user.following} />
            </div>

            <div className="profile-card-inf__item">
              <div className="profile-card-inf__title">{posts.length}</div>
              <div className="profile-card-inf__txt">Posts</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
