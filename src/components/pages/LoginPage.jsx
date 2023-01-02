import styled from "@emotion/styled";
import useInput from "../../hooks/useInput";
import Input from "../Input";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginContainer = styled.div(({ theme }) => ({
  marginTop: "5vh",
  paddingBottom: "5vh",
  backgroundColor: theme.colors.neutral.white,
  border: `1px solid ${theme.colors.neutral.darkGray}`,
  borderRadius: "5px",
  ".link-wrapper": {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    ".register-link": {
      textDecoration: "none",
      color: theme.colors.primary.normal,
    },
    ".register-link:hover": {
      textDecoration: "underline",
      color: theme.colors.primary.darker,
    },
  },
  h3: {
    margin: "3vh 0px 3vh 0px",
    textAlign: "center",
    fontSize: "1.3em",
    fontWeight: "normal",
  },
  form: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    button: {
      width: "100%",
      border: `1px solid ${theme.colors.neutral.gray}`,
      color: theme.colors.neutral.white,
      backgroundColor: theme.colors.primary.normal,
      borderRadius: "5px",
      cursor: "pointer",
      width: "100%",
      fontSize: "1.1em",
      transition: "ease-in 0.2s",
    },
    "button:hover": {
      backgroundColor: theme.colors.primary.darker,
    },
    p: {
      textAlign: "center",
      color: theme.colors.neutral.red,
    },
  },
  [`@media only screen and (min-width: ${theme.layout.desktop})`]: {
    form: {
      width: "80%",
    },
  },
}));

const LoginPage = () => {
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const isFormEmpty = (email, password) => {
    if (email === "" || password === "") {
      setErrorText("Please fill all the input!");
      setError(true);
      return true;
    }
    setErrorText("");
    setError(false);
    return false;
  };

  const renderErrorText = (error) => {
    return error ? <p>{errorText}</p> : null;
  };

  const handleSubmit = (e, email, password) => {
    e.preventDefault();
    if (isFormEmpty(email, password)) {
    } else {
      console.log(email);
      console.log(password);
    }
  };

  return (
    <LoginContainer>
      <h3>Login</h3>
      <form
        onSubmit={(e) => {
          handleSubmit(e, email, password);
        }}
      >
        <Input
          type="text"
          value={email}
          onChange={setEmail}
          placeholder="Email"
        />
        <Input
          value={password}
          type="password"
          onChange={setPassword}
          placeholder="Password"
        />
        <button>Login</button>
        {renderErrorText(error)}
      </form>
      <div className="link-wrapper">
        <Link to={`/register`} className="register-link">
          Create Account
        </Link>
      </div>
    </LoginContainer>
  );
};

export default LoginPage;
