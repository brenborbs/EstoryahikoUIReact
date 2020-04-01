import React, { Component } from "react";
import {
  singlePost,
  remove,
  like,
  unlike,
  listRelated
} from "../../actions/PostActions";
import DefaultPost from "../../images/milind-kaduskar-87655-unsplash.jpg";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../actions/AuthActions";
import renderHTML from "react-render-html";
import Comment from "./Comment";
import styled from "@emotion/styled";

import Card from "../Posts/SmallCard";

class SinglePost extends Component {
  state = {
    post: "",
    redirectToHome: false,
    redirectToSignin: false,
    like: false,
    likes: 0,
    comments: [],
    // Related posts
    relatedPost: []
  };

  checkLike = likes => {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    let match = likes.indexOf(userId) !== -1;
    return match;
  };

  loadSinglePost = postId => {
    this.setState({ loading: true });
    singlePost(postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          post: data,
          likes: data.likes.length,
          like: this.checkLike(data.likes),
          comments: data.comments
        });
        listRelated(data._id).then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            this.setState({ relatedPost: data });
          }
        });
      }
    });
  };

  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    this.loadSinglePost(postId);
  };

  // componentDidMount = () => {
  //   const postId = this.props.match.params.postId;
  //   singlePost(postId).then(data => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       this.setState({
  //         post: data,
  //         likes: data.likes.length,
  //         like: this.checkLike(data.likes),
  //         comments: data.comments
  //       });
  //     }
  //   });
  // };

  updateComments = comments => {
    this.setState({ comments });
  };

  likeToggle = () => {
    if (!isAuthenticated()) {
      this.setState({ redirectToSignin: true });
      return false;
    }
    let callApi = this.state.like ? unlike : like;
    const userId = isAuthenticated().user._id;
    const postId = this.state.post._id;
    const token = isAuthenticated().token;

    callApi(userId, token, postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          like: !this.state.like,
          likes: data.likes.length
        });
      }
    });
  };

  deletePost = () => {
    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token;
    remove(postId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ redirectToHome: true });
      }
    });
  };

  deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete your post?");
    if (answer) {
      this.deletePost();
    }
  };

  renderPost = post => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
    const posterName = post.postedBy ? post.postedBy.name : " Unknown";

    const { like, likes } = this.state;

    return (
      <PostWrapper>
        <EditButton>
          {isAuthenticated().user &&
            isAuthenticated().user._id === post.postedBy._id && (
              <Link to={`/post/edit/${post._id}`}>
                <span className="fa fa-pencil"></span>
              </Link>
            )}
        </EditButton>
        <Header>
          <CategoryP>{post.category && post.category.name}</CategoryP>
          <HeaderH1>{post.title}</HeaderH1>
          <Author>
            <PosterName>
              Posted by <Link to={`${posterId}`}>{posterName}</Link>
            </PosterName>
            <RightPost>
              <span className="poster-date">
                <i className="fa fa-calendar"></i>{" "}
                {new Date(post.created).toDateString()}
              </span>
            </RightPost>
          </Author>
          <TagList>
            {like ? (
              <p onClick={this.likeToggle}>
                <i className="fa fa-thumbs-o-up" /> {likes} people like this. Be
                the first of your friends.
              </p>
            ) : (
              <p onClick={this.likeToggle}>
                <i className="fa fa-thumbs-o-up " /> {likes} people like this.
                Be the first of your friends.
              </p>
            )}
            <TagSocialIcons>Social share here..</TagSocialIcons>
          </TagList>
        </Header>

        <Body>
          <Image
            src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
            alt={post.title}
            onError={i => (i.target.src = `${DefaultPost}`)}
          />
          {renderHTML(post.body)}
        </Body>

        <Controls>
          {isAuthenticated().user &&
            isAuthenticated().user._id === post.postedBy._id && (
              <>
                <BtnThrash onClick={this.deleteConfirmed}>
                  <span className="fa fa-trash"> Delete this post</span>
                </BtnThrash>
              </>
            )}

          <div>
            {isAuthenticated().user && isAuthenticated().user.role === "admin" && (
              <div className="admin-card-control">
                <AdminControl>
                  <H3Title>Admin</H3Title>
                  <PDanger>Edit/Delete as an Admin</PDanger>
                  <Link to={`/post/edit/${post._id}`}>
                    <LinkEdit className="fa fa-pencil"> Update</LinkEdit>
                  </Link>
                  <BtnThrashAdmin
                    onClick={this.deleteConfirmed}
                    className="fa fa-trash"
                  >
                    {" "}
                    Delete
                  </BtnThrashAdmin>
                </AdminControl>
              </div>
            )}
          </div>
        </Controls>
      </PostWrapper>
    );
  };

  render() {
    const {
      post,
      redirectToHome,
      redirectToSignin,
      comments,
      relatedPost
    } = this.state;

    if (redirectToHome) {
      return <Redirect to={`/`} />;
    } else if (redirectToSignin) {
      return <Redirect to={`/signup`} />;
    }

    return (
      <Wrapper>
        <div className="post-row">
          {!post ? (
            <div id="loader"></div>
          ) : (
            <div className="column-post">
              {this.renderPost(post)}
              <Comment
                postId={post._id}
                comments={comments.reverse()}
                updateComments={this.updateComments}
              />
              <RelatedPostWrapper>
                <div>
                  <RelatedTitle>
                    <h2>Related Posts</h2>
                  </RelatedTitle>
                  <div className="relatedCardWrapper">
                    {relatedPost.map((post, i) => (
                      <Card key={i} post={post} />
                    ))}
                  </div>
                </div>
              </RelatedPostWrapper>
            </div>
          )}
        </div>
      </Wrapper>
    );
  }
}

export default SinglePost;

const Wrapper = styled("div")`
  padding-top: 5rem;
  margin-bottom: 5rem;
`;
const PostWrapper = styled("div")`
  border-radius: 5px;
  border: 1px solid #eee;
  background-color: #fff;
  padding: 2rem 1rem 1rem 1rem;
  margin: 0 auto;
  max-width: 54rem;
  position: relative;
  margin-bottom: 3rem;
`;
const EditButton = styled("span")`
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
  margin-right: 10px;

  .fa {
    color: #ef6632;
  }
`;
const Header = styled("div")`
  border-bottom: 1px solid #eee;
  max-width: 40rem;
  margin: 0 auto;
`;
const CategoryP = styled("p")`
  text-transform: uppercase;
  margin-bottom: 12px;
`;
const HeaderH1 = styled("h1")`
  font-weight: 800;
`;
const Author = styled("span")`
  color: #788187;
  margin: 10px 0 10px 0;
  line-height: 1.2;
  font-size: 90%;
  display: flex;
  align-items: center;
`;
const PosterName = styled("div")`
  margin-top: -4px;
  float: left;
`;
const RightPost = styled("div")`
  margin-left: 12px;
  position: relative;
  top: -2px;
`;
const TagList = styled("div")`
  display: flex;
  justify-content: space-between;
  color: #788187;
  font-size: 12px;
  .fa {
    padding: 10px;
    color: var(--purple-haze);
    font-size: 16px;
  }
`;
const TagSocialIcons = styled("div")`
  padding-top: 14px;
`;
const Body = styled("div")`
  padding: 1rem 0 1rem 0;
  clear: left;
  max-width: 40rem;
  margin: 0 auto;
`;
const Image = styled("img")`
  width: 100%;
  display: block;
  margin-bottom: 10px;
`;

const Controls = styled("div")`
  max-width: 40rem;
  margin: 0 auto 0.5rem;
`;
const BtnThrash = styled("button")`
  padding: 8px;
  font-size: 18px;
  text-transform: uppercase;
  color: white;
  background-color: #c32d0e;
  border-radius: 5px;
  width: 200px;
  text-shadow: 1px 1px 2px black;
`;
const AdminControl = styled("div")`
  padding: 10px;
  text-align: center;
`;
const H3Title = styled("h3")`
  margin-bottom: 6px;
`;
const PDanger = styled("p")`
  margin-bottom: 8px;
  color: #dc3545;
`;
const LinkEdit = styled("span")`
  padding: 8px;
  color: white;
  text-transform: uppercase;
  background-color: #ef6632;
  margin-right: 20px;
  border-radius: 5px;
`;
const BtnThrashAdmin = styled("button")`
  padding: 8px;
  text-transform: uppercase;
  color: white;
  background-color: #c32d0e;
  border-radius: 5px;
  border-color: transparent;
`;
const RelatedPostWrapper = styled("div")`
  border-radius: 5px;
  border: 1px solid #eee;
  background-color: #fff;
  padding: 0.5rem 1rem 1rem 1rem;
  margin: 0 auto;
  max-width: 54rem;
  position: relative;
  margin-bottom: 3rem;
  margin-top: 3rem;
`;
const RelatedTitle = styled("div")`
  text-align: center;
  padding: 20px;
`;
