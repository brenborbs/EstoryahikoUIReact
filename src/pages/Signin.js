import React, { Component } from "react";
import styled from "@emotion/styled";
import { Redirect } from "react-router-dom";
import { signin, authenticate } from "../actions/AuthActions";
import { Link } from "react-router-dom";
import FormInput from "../components/Forms/FormInput";

export default class Signin extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    redirectToReferer: false,
    loading: false
  };
  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    // console.log(user);
    signin(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
      }
    });
  };

  signinForm = (email, password, loading) => (
    <form>
      <FormInput
        label="email"
        type="email"
        placeholder="Email"
        aria-label="Email"
        onChange={this.handleChange("email")}
        value={email}
      />

      <FormInput
        label="password"
        type="password"
        placeholder="Password"
        aria-label="Password"
        onChange={this.handleChange("password")}
        value={password}
      />

      <LoginButton type="submit" onClick={this.clickSubmit}>
        {loading && <i className="fa fa-refresh fa-spin"></i>}
        {loading && <span> Logging in...</span>}
        {!loading && <span> Login</span>}
      </LoginButton>
    </form>
  );

  render() {
    const { email, password, error, redirectToReferer, loading } = this.state;
    if (redirectToReferer) {
      return <Redirect to="/posts" />;
    }
    return (
      <SigninWrapper>
        <LoginMainText>
          <h2>Login</h2>
          <p>Create a post for today and share.</p>
        </LoginMainText>

        <SigninContainer>
          <LoginFormContainer>
            {this.signinForm(email, password, loading)}
            <div
              className="alert-danger"
              style={{ display: error ? "" : "none", marginTop: "16px" }}
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
            <LoginLinks>
              <ul>
                <li>
                  Forgot your password?{" "}
                  <Link to="/auth/password/forgot">Go here</Link>
                </li>
                <li>
                  Don't have an account? <Link to="/signup">Join</Link>
                </li>
              </ul>
            </LoginLinks>
          </LoginFormContainer>
        </SigninContainer>
      </SigninWrapper>
    );
  }
}
const SigninWrapper = styled("div")`
  margin-top: 6rem;
`;

const LoginMainText = styled("div")`
  text-align: center;
`;

const SigninContainer = styled("div")`
  padding: 10px;
  position: relative;
  max-width: 550px;
  margin: 20px auto;
`;

const LoginFormContainer = styled("div")`
  padding: 30px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.12);
`;

const LoginLinks = styled("div")`
  margin-top: 12px;
`;

const LoginButton = styled("button")`
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
