import React, { Component } from "react";
import { isAuthenticated } from "../../actions/AuthActions";
import { Redirect } from "react-router-dom";
import { create } from "../../actions/PostActions";
import { getCategories } from "../../actions/CategoryActions";
// import { Redirect } from "react-router-dom";
import styled from "@emotion/styled";
import FormInput from "../Forms/FormInput";
import PhotoInput from "../Forms/PhotoInput";

// editor
import ReactQuill from "react-quill";
import { QuillModules, QuillFormats } from "../../helpers/quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";

class NewPost extends Component {
  state = {
    title: "",
    body: "",
    photo: "",
    error: "",
    user: {},
    fileSize: 0,
    loading: false,
    redirectToProfile: false,
    categories: []
  };

  // grab blog body from local storage
  blogFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("post")) {
      return JSON.parse(localStorage.getItem("post"));
    } else {
      return false;
    }
  };

  // Error cannot load categories
  loadCategories = categories => {
    getCategories(categories).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ categories: data });
      }
    });
  };

  componentDidMount = () => {
    this.loadCategories(this.state.categories);
    this.setState({ user: isAuthenticated().user });
    this.postData = new FormData();
  };

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (fileSize > 100000) {
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

  // handleEditorChange = event => {
  //     const newBody = event.editor.getData();
  //     this.setState({ body: newBody });
  //   };

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
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, this.postData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            loading: false,
            title: "",
            body: "",
            redirectToProfile: true,
            success: true
          });
        }
      });
    }
  };

  handleBody = e => {
    // console.log(e);
    this.setState({ body: e });
    this.postData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  newPostForm = (title, body, categories, loading) => (
    <form>
      <PhotoInput
        label="Photo"
        onChange={this.handleChange("photo")}
        type="file"
        accept="image/*"
      />

      <FormInput
        label="Title"
        onChange={this.handleChange("title")}
        type="text"
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
          rows="20"
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
        {loading && <span> Creating...</span>}
        {!loading && <span> Create Post</span>}
      </Button>
    </form>
  );

  render() {
    const {
      title,
      body,
      // photo,
      user,
      error,
      loading,
      categories,
      redirectToProfile
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${user._id}`} />;
    }

    return (
      <div className="right_dash">
        <FormWrapper>
          <h2 className="mt-5 mb-5">Create a new post</h2>
          <div
            className="alert-danger"
            style={{ display: error ? "" : "none", marginTop: "10px" }}
          >
            <div className="alert-icon">
              <i
                className="fa fa-exclamation-circle"
                aria-hidden="true"
                style={{ color: "#f44336" }}
              ></i>
            </div>
            <div className="alert-message">{error}</div>
          </div>

          {loading ? (
            <div className="jumbotron text-center">
              <h2>Loading...</h2>
            </div>
          ) : (
            ""
          )}

          {this.newPostForm(title, body, categories, loading)}
        </FormWrapper>
      </div>
    );
  }
}

export default NewPost;

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
