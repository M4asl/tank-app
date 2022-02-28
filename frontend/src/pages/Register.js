import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { register } from "../actions/authActions.js";
import FormContainer from "../components/FormContainer.js";
// import Loader from "../components/Layout/Loader";
import { toast } from "react-toastify";

const Register = ({ history }) => {
  const dispatch = useDispatch();
  const { loading, userInfo, error } = useSelector((state) => state.register);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    country: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.firstName || !values.lastName || !values.country) {
      toast.error("All fields are required!");
    }
    if (values.email.length > 255) {
      toast.error("Max length email is 255 characters.");
    }
    dispatch(
      register(
        values.firstName,
        values.lastName,
        values.country,
        values.email,
        values.password,
        values.passwordConfirm
      )
    );
  };

  const data = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "First name",
      htmlFor: "first_name_field",
      label: "First name",
      value: values.firstName,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Last name",
      htmlFor: "last_name_field",
      label: "Last name",
      value: values.lastName,
    },
    {
      id: 3,
      name: "country",
      type: "text",
      placeholder: "Country",
      htmlFor: "country_field",
      label: "Country",
      value: values.country,
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "Email",
      htmlFor: "email_field",
      label: "Email",
      value: values.email,
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      htmlFor: "password_field",
      label: "Password",
      value: values.password,
    },
    {
      id: 6,
      name: "passwordConfirm",
      type: "password",
      placeholder: "Confirm password",
      htmlFor: "password_confirm_field",
      label: "Confirm password",
      value: values.passwordConfirm,
    },
  ];

  return (
    <RegisterWrapper>
      <FormContainer
        title={"Sign up"}
        data={data}
        values={values}
        setValues={setValues}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </RegisterWrapper>
  );
};

const RegisterWrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin-bottom: 50px;
`;

export default Register;
