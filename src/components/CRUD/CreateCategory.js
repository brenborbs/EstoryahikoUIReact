import React, { useState } from "react";
import { isAuthenticated } from "../../actions/AuthActions";
import { Link } from "react-router-dom";
import { createCategory } from "../../actions/CategoryActions";
import styled from "@emotion/styled";
import FormInput from "../Forms/FormInput";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = e => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // make request to api to create category
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const newCategoryFom = () => (
    <form onSubmit={clickSubmit}>
      <FormInput
        label="Name"
        type="text"
        className="form-control"
        onChange={handleChange}
        value={name}
        autoFocus
        required
      />

      <Button>Create Category</Button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <div className="alert-success">New Category is created</div>;
    }
  };

  const showError = () => {
    if (error) {
      return (
        <div className="alert-danger">
          {" "}
          <div className="alert-icon">
            <i
              className="fa fa-exclamation-circle"
              aria-hidden="true"
              style={{ color: "#f44336" }}
            ></i>
          </div>
          <div className="alert-message"> Category should be unique</div>
        </div>
      );
    }
  };

  const goBack = () => (
    <div style={{ marginTop: "10px" }}>
      <Link to="/admin" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Wrapper>
      <FormWrapper>
        <FormContainer>
          {showSuccess()}
          {showError()}
          {newCategoryFom()}
          {goBack()}
        </FormContainer>
      </FormWrapper>
    </Wrapper>
  );
};

export default AddCategory;

const Wrapper = styled("div")`
  margin-top: 6rem;
`;
const FormWrapper = styled("div")`
  padding: 10px;
  position: relative;
  max-width: 550px;
  margin: 20px auto;
`;
const FormContainer = styled("div")`
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
