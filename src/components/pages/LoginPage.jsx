import styled from "@emotion/styled";
import useInput from "../../hooks/useInput";
import Input from "../Input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../../api/notesAPI.js";
import { useNavigate } from "react-router-dom";
import loadingIcon from "../../assets/loading.gif";

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
      fontSize: "1.1em",
      transition: "ease-in 0.2s",
    },
    "button:hover": {
      backgroundColor: theme.colors.primary.darker,
    },
    ".error-message": {
      color: theme.colors.neutral.red,
    },
    ".success-message": {
      color: theme.colors.neutral.green,
    },
    p: {
      textAlign: "center",
    },
  },
  [`@media only screen and (min-width: ${theme.layout.desktop})`]: {
    form: {
      width: "80%",
    },
  },
  ".loading-icon": {
    width: "40px",
    height: "40px",
  },
}));

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [success, setSuccess] = useState(false);
  const [successText, setSuccesText] = useState("");

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

  const renderErrorText = (error, errorText) => {
    return error ? <p className="error-message">{errorText}</p> : null;
  };

  const renderSuccessText = (success, successText) => {
    return success ? <p className="success-message">{successText}</p> : null;
  };

  const renderButtonText = (isLoading) => {
    return isLoading ? (
      <img src={loadingIcon} className="loading-icon" alt="loading icon" />
    ) : (
      "Login"
    );
  };
  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    if (isFormEmpty(email, password)) {
    } else {
      setIsLoading(true);
      const { error, message, data } = await login({ email, password });
      if (error) {
        setError(true);
        setErrorText(message);
      } else {
        setSuccess(true);
        setSuccesText(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      setIsLoading(false);
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
          type="email"
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
        <button>{renderButtonText(isLoading)}</button>
        {renderErrorText(error, errorText)}
        {renderSuccessText(success, successText)}
      </form>
      <div className="link-wrapper">
        <Link to={`/register`} className="register-link">
          Don't have an account? Sign up
        </Link>
      </div>
    </LoginContainer>
  );
};

export default LoginPage;
