import React from "react";
import styled from "@emotion/styled";

const FormInput = ({ onChange, placeholder, value, label, type }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </FormGroup>
  );
};

export default FormInput;

const FormGroup = styled("div")`
  display: grid;
  margin-bottom: 10px;
`;
const Input = styled("input")`
  padding: 10px;
  font-size: 15px;
  width: 100%;
  border: 1px solid #d1d1d1;
  background-color: rgb(252, 252, 252);
`;
const Label = styled("div")`
  color: #404040;
  padding-bottom: 5px;
  font-size: 18px;
  text-transform: capitalize;
`;
