import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../actions/authActions.js";
import FormContainer from "../components/FormContainer.js";
// import Loader from "../components/Layout/Loader";
import { toast } from "react-toastify";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.login);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      toast.error("Provide email and password!");
    }
    dispatch(login(values.email, values.password));
  };

  const data = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      htmlFor: "email_field",
      label: "Email",
      value: values.email,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      htmlFor: "password_field",
      label: "Password",
      value: values.password,
    },
  ];

  return (
    <LoginWrapper>
      <FormContainer
        title={"Sign in"}
        data={data}
        values={values}
        setValues={setValues}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

export default Login;
