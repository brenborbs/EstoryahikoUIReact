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
      <div className="user-profile-container">
        <Wrapper>
          <Banner>
            <Column>
              <ControlButtons>
                <FollowButton>
                  <span>
                    {isAuthenticated().user &&
                    isAuthenticated().user._id === user._id ? (
                      <>
                        <Link className="btn-profile add-post" to={`/newPost`}>
                          New Post
                        </Link>

                        <Link
                          className="btn-profile edit-profile"
                          to={`/user/edit/${user._id}`}
                        >
                          Edit Profile
                        </Link>
                        <DeleteUser userId={user._id} />
                      </>
                    ) : (
                      <FollowProfileButton
                        following={this.state.following}
                        onButtonClick={this.clickFollowButton}
                      />
                    )}
                  </span>
                </FollowButton>
              </ControlButtons>
              <UserH1>
                {" "}
                <Userpic
                  onError={i => (i.target.src = `${DefaultProfile}`)}
                  alt={user.name}
                  src={photoUrl}
                />{" "}
                {user.name}
              </UserH1>
              <div>
                <UserBio>{user.about}</UserBio>
                {/* <div className="UserProfile__stats">
                  <span>23 followers</span>
                  <span>3 following</span>
                  <span>12 posts</span>
                </div> */}
                <UserInfo>
                  <InfoSpan>
                    {" "}
                    {`Joined ${new Date(user.created).toDateString()}`}
                  </InfoSpan>
                  <InfoSpan>{user.email}</InfoSpan>
                </UserInfo>
              </div>
            </Column>
          </Banner>
          {/* Posts Profile Tabs */}
          <ProfileBottom>
            <ProfileTabs
              followers={user.followers}
              following={user.following}
              posts={posts}
            />
          </ProfileBottom>
        </Wrapper>
      </div>
    );
  }
}

const Wrapper = styled("div")`
padding-top: 2rem;
}
`;
const Banner = styled("div")`
  max-width: none;
  text-align: center;
  color: #fefefe;
  margin-right: auto;
  margin-left: auto;
`;
const Column = styled("div")`
  background: #283336;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  text-shadow: 1px 1px 2px black;
  min-height: 40vh;
`;
const ControlButtons = styled("div")`
  position: relative;
`;
const FollowButton = styled("div")`
  position: absolute;
  top: 40px;
  right: 20px;
`;
const Userpic = styled("img")`
  margin-right: 0.75rem;
  vertical-align: middle;
  display: inline-block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 50%;
  width: 48px;
  height: 48px;
`;
const UserH1 = styled("h1")`
  padding-top: 80px;
  font-weight: 600;
  font-size: 1.84524rem;
`;
const UserBio = styled("p")`
  margin: -0.4rem auto 0.5rem;
  font-size: 95%;
  max-width: 420px;
  line-height: 1.4;
  padding-top: 20px;
`;
const UserInfo = styled("p")`
  font-size: 90%;
  margin-bottom: 1rem;
`;
const InfoSpan = styled("span")`
  margin-right: 20px;
`;
const ProfileBottom = styled("div")`
  max-width: 75rem;
  margin-left: auto;
`;
