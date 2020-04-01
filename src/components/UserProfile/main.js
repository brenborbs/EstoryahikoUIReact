import React, { Component } from "react";
import { isAuthenticated } from "../../actions/AuthActions";
import { Redirect, Link } from "react-router-dom";
import { read } from "../../actions/UserActions";
import DefaultProfile from "../../images/avatar.jpg";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton"; // ok
import ProfileTabs from "./ProfileTabs";
import { listByUser } from "../../actions/PostActions";
import styled from "@emotion/styled";

export default class UserProfile extends Component {
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

  clickFollowButton = callApi => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    callApi(userId, token, this.state.user._id).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data, following: !this.state.following });
      }
    });
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
    //console.log(this.props.match.params.userId)
    const userId = this.props.match.params.userId;
    this.init(userId);
  };

  UNSAFE_componentWillReceiveProps = props => {
    //console.log(this.props.match.params.userId)
    const userId = props.match.params.userId;
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
      <>
        <div className="userprofile-wrapper">
          <div className="userprofile-first">
            <div>
              <div className="userprofile-second">
                <div className="userprofile-left">
                  <div className="leftprofirst">
                    <ImageWrapper>
                      <Userpic
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={user.name}
                        src={photoUrl}
                      />
                    </ImageWrapper>
                  </div>
                </div>
                <div className="userprofile-right">
                  <div className="rightprofirst">
                    <div className="colright">
                      <div className="colrightfirst">
                        <div className="username">{user.name}</div>
                        <div className="controlbuttons">
                          <div className="controlbtnwrapper">
                            {isAuthenticated().user &&
                            isAuthenticated().user._id === user._id ? (
                              <>
                                {/* <div className="contbtn">
                                  <Link
                                    className="btn-profile add-post"
                                    to={`/newPost`}
                                  >
                                    New Post
                                  </Link>
                                </div> */}
                                <div className="contbtn">
                                  <Link
                                    className="btn-profile edit-profile"
                                    to={`/user/edit/${user._id}`}
                                  >
                                    Edit Profile
                                  </Link>
                                  <DeleteUser userId={user._id} />
                                </div>
                              </>
                            ) : (
                              <div className="contbtn">
                                <FollowProfileButton
                                  following={this.state.following}
                                  onButtonClick={this.clickFollowButton}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="colright">
                      <div className="profdetails">
                        <div className="datejoined ing">
                          <div className="joinfir">
                            <div className="joinsec">
                              <i className="fa fa-calendar ofi"></i>{" "}
                              {`Joined ${new Date(
                                user.created
                              ).toDateString()}`}
                            </div>
                          </div>
                        </div>
                        <div className="profabout ing">{user.about}</div>
                        <div className="profemail ing">{user.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Posts Profile Tabs */}
        <ProfileBottom>
          <ProfileTabs
            followers={user.followers}
            following={user.following}
            posts={posts}
          />
        </ProfileBottom>
      </>
    );
  }
}

const ImageWrapper = styled("div")`
  position: relative;
  display: inline-block;
  line-height: 1;
  border-radius: 50%;
  overflow: hidden;
  vertical-align: middle;
  background-color: rgba(0, 0, 0, 0.1);
  width: 150px;
  height: 150px;
`;

const Userpic = styled("img")`
  height: 150px;
  vertical-align: unset;
  width: 100%;
`;
const ProfileBottom = styled("div")`
  max-width: 75rem;
  margin-left: auto;
`;
