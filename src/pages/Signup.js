import React, { Component } from "react";
import { signup } from "../actions/AuthActions";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import FormInput from "../components/Forms/FormInput";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: "",
    open: false,
    loading: false
  };

  handleChange = name => event => {
    this.setState({ error: false });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password
    };
    signup(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          open: true,
          loading: false
        });
      }
    });
  };

  render() {
    const { name, email, password, error, open, loading } = this.state;
    return (
      <SignupWrapper>
        <MainText>
          <h2>Create a New Account</h2>
          <p>It's quick and easy.</p>
        </MainText>

        <SignupContainer>
          <SignupFormContainer>
            <div
              className="alert-danger"
              style={{ display: error ? "" : "none", marginTop: "6px" }}
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

            <div className="alert-info" style={{ display: open ? "" : "none" }}>
              <div className="alert-icon">
                <i
                  className="fa fa-check-circle-o"
                  aria-hidden="true"
                  style={{ color: "#4caf50" }}
                ></i>
              </div>
              <div className="alert-message">
                {" "}
                New account is successfully created. Please Log In!
              </div>
            </div>

            <form onSubmit={this.clickSubmit}>
              <FormInput
                label="name"
                placeholder="Name"
                onChange={this.handleChange("name")}
                type="text"
                className="form-control"
                value={name}
              />

              <FormInput
                label="Email"
                placeholder="email"
                onChange={this.handleChange("email")}
                type="email"
                className="form-control"
                value={email}
              />

              <FormInput
                label="Password"
                placeholder="password"
                onChange={this.handleChange("password")}
                type="password"
                className="form-control"
                value={password}
              />

              <SignupButton>
                {loading && <i className="fa fa-refresh fa-spin"></i>}
                {loading && <span> Registering...</span>}
                {!loading && <span>Register</span>}
              </SignupButton>
            </form>
            <SignupLinks>
              Already have an account? <Link to="/signin">Login</Link>
            </SignupLinks>
          </SignupFormContainer>
        </SignupContainer>
      </SignupWrapper>
    );
  }
}

export default Signup;

const SignupWrapper = styled("div")`
  padding-top: 6rem;
`;

const MainText = styled("div")`
  text-align: center;
`;

const SignupContainer = styled("div")`
  padding: 10px;
  position: relative;
  max-width: 550px;
  margin: 20px auto;
`;
const SignupFormContainer = styled("div")`
  padding: 30px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.12);
`;

const SignupLinks = styled("div")`
  margin-top: 12px;
`;

const SignupButton = styled("button")`
  color: white;
  margin-top: 12px;
  padding: 5px 20px;
  background-color: #9649ff;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  border-radius: 5px;
  width: 100%;
`;
