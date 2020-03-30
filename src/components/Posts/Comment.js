import React, { Component } from "react";
import { comment, uncomment } from "../../actions/PostActions";
import { isAuthenticated } from "../../actions/AuthActions";
import { Link } from "react-router-dom";
import DefaultProfile from "../../images/avatar.jpg";
import styled from "@emotion/styled";

export default class Comment extends Component {
  state = {
    text: "",
    error: ""
  };

  handleChange = event => {
    this.setState({ error: "" });
    this.setState({ text: event.target.value });
  };

  isValid = () => {
    const { text } = this.state;
    if (!text.length > 0 || text.length > 150) {
      this.setState({
        error: "Comment should not be empty and less than 150 characters long!"
      });
      return false;
    }
    return true;
  };

  addComment = e => {
    e.preventDefault();
    console.log("I was click!");
    if (!isAuthenticated()) {
      this.setState({ error: "Please signin to leave a comment." });
      return false;
    }

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      const postId = this.props.postId;

      comment(userId, token, postId, { text: this.state.text }).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({ text: "" });
          // dispatch fresh list of coments to parent (SinglePost)
          this.props.updateComments(data.comments);
        }
      });
    }
  };

  deleteComment = comment => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postId = this.props.postId;

    uncomment(userId, token, postId, comment).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.props.updateComments(data.comments);
      }
    });
  };

  deleteConfirmed = comment => {
    let answer = window.confirm(
      "Are you sure you want to delete your comment?"
    );
    if (answer) {
      this.deleteComment(comment);
    }
  };

  render() {
    const { comments } = this.props;
    const { error } = this.state;
    return (
      <Wrapper>
        <CardHeaderH5>{comments.length} Comments</CardHeaderH5>
        <Body>
          <form onSubmit={this.addComment}>
            <FormGroupPost>
              <FormControlPost
                placeholder="Write a comment..."
                rows="3"
                type="text"
                onChange={this.handleChange}
                value={this.state.text}
              ></FormControlPost>
            </FormGroupPost>
            <ButtonComment type="submit">Submit</ButtonComment>
          </form>
          <div className="clearfix"></div>
          <div
            className="alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            <div className="alert-icon">
              <i
                className="fa fa-exclamation-circle"
                aria-hidden="true"
                style={{ color: "#f44336" }}
              ></i>
            </div>
            <div className="alert-message"> {error}</div>
          </div>
          <hr />
          {comments.map((comment, i) => (
            <Media key={i}>
              <CommentImage
                onError={i => (i.target.src = `${DefaultProfile}`)}
                src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                alt={comment.postedBy.name}
                style={{ borderRadius: "50%" }}
              />
              <MediaBody>
                <TextMutedRight>
                  <Small>{new Date(comment.created).toDateString()}</Small>
                </TextMutedRight>
                <MediaH5>
                  <Link to={`/user/${comment.postedBy._id}`}>
                    <StrongText>{comment.postedBy.name} </StrongText>
                  </Link>
                </MediaH5>
                {comment.text}
                <span>
                  {isAuthenticated().user &&
                    isAuthenticated().user._id === comment.postedBy._id && (
                      <>
                        <Remove onClick={() => this.deleteConfirmed(comment)}>
                          Remove
                        </Remove>
                      </>
                    )}
                </span>
              </MediaBody>
            </Media>
          ))}
        </Body>
      </Wrapper>
    );
  }
}

const Wrapper = styled("div")`
  margin-top: 2rem;
  border-radius: 5px;
  border: 1px solid #eee;
  background-color: #fff;
  padding: 2rem 1rem 1rem 1rem;
  margin: 0 auto;
  max-width: 54rem;
  position: relative;
`;
const CardHeaderH5 = styled("h5")`
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.2;
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);

  :first-of-type {
    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
  }
`;
const Body = styled("div")`
  margin-top: 10px;
  padding: 10px;
  flex: 1 1 auto;
  min-height: 1px;
`;
const FormGroupPost = styled("div")`
  display: grid;
  margin-bottom: 10px;
`;
const FormControlPost = styled("textarea")`
  display: block;
  height: 80px;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;
const ButtonComment = styled("button")`
  color: white;
  background-color: var(--purple-haze);
  margin: 10px;
  vertical-align: middle;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  text-shadow: 1px 1px 2px black;
`;
const Media = styled("div")`
  display: flex;
  align-items: flex-start;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`;
const CommentImage = styled("img")`
  height: 54px;
  width: 54px;
  margin-left: auto;
  margin-right: auto;
`;
const MediaBody = styled("div")`
  flex: 1 1;
  margin-left: 1rem;
`;
const TextMutedRight = styled("span")`
  float: right;
  margin-bottom: 5px;
  font-style: italic;
  color: #6c757d;
`;
const Small = styled("small")`
  font-size: 80%;
  font-weight: 400;
`;
const MediaH5 = styled("h5")`
  font-size: 20px;
  margin-bottom: 5px;
`;
const Remove = styled("span")`
  cursor: pointer;
  color: #dc3545;
  float: right;
`;
const StrongText = styled("strong")`
  font-weight: bolder;
`;
