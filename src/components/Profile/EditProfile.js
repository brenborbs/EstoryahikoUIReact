import React, { Component } from "react";
import { isAuthenticated } from "../../actions/AuthActions";
import { read, update, updateUser } from "../../actions/UserActions";
import { Redirect } from "react-router-dom";
import DefaultProfile from "../../images/avatar.jpg";
import styled from "@emotion/styled";
import FormInput from "../Forms/FormInput";
import PhotoInput from "../Forms/PhotoInput";

class EditProfile extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    password: "",
    redirectToProfile: false,
    error: "",
    fileSize: 0,
    loading: false,
    about: "",
    about_for_photo: "",
    userData: process.browser && new FormData()
  };

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        //console.log("ERROR")
        this.setState({ redirectToProfile: true });
      } else {
        // console.log(data)
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          error: "",
          about: data.about,
          about_for_photo: data.about
        });
      }
    });
  };

  componentDidMount = () => {
    //console.log(this.props.match.params.userId)
    this.userData = new FormData();
    const userId = this.props.match.params.userId;
    this.init(userId);
  };

  isValid = () => {
    const { name, email, password, fileSize } = this.state;
    if (fileSize > 1000000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false
      });
      return false;
    }
    if (name.length === 0) {
      this.setState({ error: "Name is required", loading: false });
      return false;
    }
    // email@domain.com
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({
        error: "A valid Email is required",
        loading: false
      });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({
        error: "Password must be at least 6 characters long",
        loading: false
      });
      return false;
    }
    return true;
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;

      update(userId, token, this.userData).then(data => {
        if (data.error) {
          this.setState({ error: data.error });
        } else if (isAuthenticated().user.role === "admin") {
          this.setState({
            redirectToProfile: true
          });
        } else {
          updateUser(data, () => {
            this.setState({
              redirectToProfile: true
            });
          });
        }
      });
    }
  };

  signupForm = (name, email, password, about) => (
    <form>
      <PhotoInput
        label="Profile Photo"
        onChange={this.handleChange("photo")}
        type="file"
        accept="image/*"
        className="form-control"
      />

      <FormInput
        label="Name"
        onChange={this.handleChange("name")}
        type="text"
        className="form-control"
        value={name}
      />

      <FormInput
        label="Email"
        onChange={this.handleChange("email")}
        type="email"
        className="form-control"
        value={email}
      />

      <div className="form-group">
        <label className="label_inputs">About</label>
        <textarea
          onChange={this.handleChange("about")}
          type="text"
          className="form-control"
          value={about}
        />
      </div>

      <FormInput
        label="Password"
        onChange={this.handleChange("password")}
        type="password"
        className="form-control"
        value={password}
      />

      <Button onClick={this.clickSubmit}>Update</Button>
    </form>
  );

  render() {
    const {
      id,
      name,
      email,
      password,
      redirectToProfile,
      error,
      loading,
      about
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    const photoUrl = id
      ? `${
          process.env.REACT_APP_API_URL
        }/user/photo/${id}?${new Date().getTime()}`
      : DefaultProfile;

    return (
      <Wrapper>
        <MainText>
          <h2>Edit Profile</h2>
        </MainText>

        <Container>
          <FormWrapper>
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
              src={photoUrl}
              onError={i => (i.target.src = `${DefaultProfile}`)}
              alt={name}
              style={{
                width: "50%",
                margin: "20px auto",
                display: "block",
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />

            {isAuthenticated().user.role === "admin" &&
              this.signupForm(name, email, password, about)}

            {isAuthenticated().user._id === id &&
              this.signupForm(name, email, password, about)}
          </FormWrapper>
        </Container>
      </Wrapper>
    );
  }
}

export default EditProfile;

const Wrapper = styled("div")`
  margin-top: 6rem;
`;
const MainText = styled("div")`
  text-align: center;
`;
const Container = styled("div")`
  padding: 10px;
  position: relative;
  max-width: 550px;
  margin: 20px auto;
`;
const FormWrapper = styled("div")`
  padding: 30px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.12);
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
