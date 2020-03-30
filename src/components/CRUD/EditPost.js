import React, { Component } from "react";
import { singlePost, update } from "../../actions/PostActions";
import { getCategories } from "../../actions/CategoryActions";
import { isAuthenticated } from "../../actions/AuthActions";
import { Redirect } from "react-router-dom";
import DefaultPost from "../../images/milind-kaduskar-87655-unsplash.jpg";
import FormInput from "../Forms/FormInput";
import PhotoInput from "../Forms/PhotoInput";
import styled from "@emotion/styled";

// editor
import ReactQuill from "react-quill";
import { QuillModules, QuillFormats } from "../../helpers/quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";

class EditPost extends Component {
  state = {
    id: "",
    title: "",
    body: "",
    redirectToProfile: false,
    error: "",
    fileSize: 0,
    loading: false,
    categories: []
  };

  loadCategories = categories => {
    getCategories(categories).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ categories: data });
      }
    });
  };

  init = postId => {
    singlePost(postId).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data.postedBy._id,
          title: data.title,
          body: data.body,
          error: ""
        });
      }
    });
  };

  componentDidMount = () => {
    this.loadCategories(this.state.categories);
    this.postData = new FormData();
    const postId = this.props.match.params.postId;
    this.init(postId);
  };

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (fileSize > 1000000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false
      });
      return false;
    }
    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }
    return true;
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const postId = this.props.match.params.postId;
      const token = isAuthenticated().token;

      update(postId, token, this.postData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            loading: false,
            title: "",
            body: "",
            redirectToProfile: true
          });
        }
      });
    }
  };

  handleBody = e => {
    // console.log(e);
    this.setState({ body: e });
    this.postData.set("body", e);
  };

  editPostForm = (title, body, categories, loading) => (
    <form>
      <PhotoInput
        label="Post Photo"
        onChange={this.handleChange("photo")}
        type="file"
        accept="image/*"
        className="form-control"
      />

      <FormInput
        label="Title"
        onChange={this.handleChange("title")}
        type="text"
        className="form-control"
        value={title}
      />

      <div className="form-group">
        <label className="label_inputs">Body</label>
        <ReactQuill
          modules={QuillModules}
          formats={QuillFormats}
          value={body}
          placeholder="Write something amazing..."
          onChange={this.handleBody}
        />
      </div>
      <div className="form-group">
        <label className="label_inputs">Category</label>
        <select
          onChange={this.handleChange("category")}
          className="form-control"
        >
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <Button onClick={this.clickSubmit}>
        {loading && <i className="fa fa-refresh fa-spin"></i>}
        {loading && <span> Updating...</span>}
        {!loading && <span> Update Post</span>}
      </Button>
    </form>
  );

  render() {
    const {
      id,
      title,
      body,
      redirectToProfile,
      error,
      loading,
      categories
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
    }

    return (
      <div className="right_dash">
        <FormWrapper>
          <h2>{title}</h2>

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

          {loading ? (
            <div className="jumbotron text-center">
              <h2>Loading...</h2>
            </div>
          ) : (
            ""
          )}

          <img
            style={{ height: "200px", width: "auto" }}
            className="img-thumbnail"
            src={`${
              process.env.REACT_APP_API_URL
            }/post/photo/${id}?${new Date().getTime()}`}
            onError={i => (i.target.src = `${DefaultPost}`)}
            alt={title}
          />

          {isAuthenticated().user.role === "admin" &&
            this.editPostForm(title, body, categories, loading)}
          <div className="user-controls">
            {isAuthenticated().user._id === id &&
              this.editPostForm(title, body, categories, loading)}
          </div>
        </FormWrapper>
      </div>
    );
  }
}

export default EditPost;

const FormWrapper = styled("div")`
  margin-top: 5rem;
  padding: 2rem;
  background-color: white;
`;

const Button = styled("button")`
  color: white;
  padding: 5px 20px;
  background-color: #f35369;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  margin-top: 1em;
  width: 100%;
  text-align: center;
`;
