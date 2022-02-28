import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const FormContainer = ({
  title,
  data,
  values,
  setValues,
  handleSubmit,
  location,
  loading,
  vintage,
  setVintage,
  dateInCountry,
  setDateInCountry,
}) => {
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <GlassCard>
      <FormWrapper onSubmit={handleSubmit}>
        <TextTitle>{title}</TextTitle>
        {data.map((item) => (
          <FormGroup key={item.id}>
            <Label htmlFor={item.htmlFor}>{item.label}</Label>
            <StyledInput
              type={item.type}
              placeholder={item.label}
              id={item.htmlFor}
              value={item.value}
              onChange={handleChange(`${item.name}`)}
            />
          </FormGroup>
        ))}
        {location?.pathname.includes("tanks") && (
          <>
            <FormGroup>
              <Label>Vintage</Label>
              <DatePicker
                selected={vintage}
                onChange={(date) => setVintage(date)}
                showYearPicker
                minDate={new Date(1900, 0, 1)}
                maxDate={new Date()}
                dateFormat="yyyy"
                className="calendar-vintage"
                fixedHeight
              />
            </FormGroup>
            <FormGroup>
              <Label>Date in country</Label>
              <DatePicker
                selected={dateInCountry}
                onChange={(date) => setDateInCountry(date)}
                minDate={new Date("January 01, 1970 00:00:00")}
                maxDate={new Date()}
                className="calendar-date-in-country"
                fixedHeight
              />
            </FormGroup>
          </>
        )}

        {title === "Sign in" && (
          <LinkContainer>
            <Link to="#">Forgot password?</Link>
          </LinkContainer>
        )}

        <Button
          id="login_button"
          type="submit"
          disabled={loading ? true : false}
        >
          {loading ? "Loading..." : title}
        </Button>
        {title === "Sign in" && (
          <LinkContainer>
            <Link to="/register">Create acount</Link>
          </LinkContainer>
        )}
        {title === "Sign up" && (
          <LinkContainer>
            <Link to="/login">Already have an account?</Link>
          </LinkContainer>
        )}
      </FormWrapper>
    </GlassCard>
  );
};

const LinkContainer = styled.span`
  a {
    color: ${({ theme }) => theme.text.primary};
  }
`;

const TextTitle = styled.h1`
  color: ${({ theme }) => theme.text.secondary};
`;

const GlassCard = styled.div`
  left: 50%;
  transform: translateX(-50%);
  position: relative;
  z-index: 1;
  width: 550px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.text.secondary};

  .react-datepicker__input-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .calendar-vintage,
  .calendar-date-in-country {
    width: 80%;
    height: 4rem;
    margin-top: 10px;
  }

  @media only ${({ theme }) => theme.breakpoints.md} {
    width: 500px;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    margin-top: 50px;
    width: 400px;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    width: 300px;
  }
`;

const Label = styled.label`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  width: 80%;
  height: 4.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.text.secondary};
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 2rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: ${({ theme }) => theme.text.primary};
    font-weight: 100;
    font-size: 2rem;
  }
`;

const FormWrapper = styled.form`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const FormGroup = styled.div`
  width: 100%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 180px;
  min-height: 35px;
  margin: 20px 0px;
  background: transparent;
  color: ${({ theme }) => theme.text.secondary};
  border: 2px solid ${({ theme }) => theme.text.secondary};
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 120px;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    width: 80px;
    min-height: 30px;
    font-size: 1rem;
  }
`;

export default FormContainer;
