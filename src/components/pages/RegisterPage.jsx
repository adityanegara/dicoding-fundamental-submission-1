import { useContext, useEffect } from "react";
import ThemeContext from "../../contexts/ThemeContext";
import LocaleContext from "../../contexts/LocaleContext";
import styled from "@emotion/styled";
import useInput from "../../hooks/useInput";
import Input from "../Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../api/notesAPI.js";
import loadingIcon from "../../assets/loading.gif";
import TEXT from "../../constant/text";

const RegisterContainer = styled.div(({ theme, isDarkTheme }) => ({
  marginTop: "5vh",
  paddingBottom: "5vh",
  backgroundColor:
    isDarkTheme === "light"
      ? theme.colors.neutral.white
      : theme.colors.neutral.lightBlack,
  border: `1px solid`,
  borderColor:
    isDarkTheme === "light"
      ? theme.colors.neutral.gray
      : theme.colors.neutral.lighterBlack,
  color: isDarkTheme === "light" ? "black" : "white",
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
      border: `1px solid transparent`,
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

const RegisterPage = () => {
  const { theme } = useContext(ThemeContext);
  const {locale} = useContext(LocaleContext);
  const navigate = useNavigate();
  const [name, setName] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [confirmPassword, setConfirmPassword] = useInput("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successText, setSuccesText] = useState("");

  useEffect(()=>{
    if(errorText === TEXT['id'].emptyFormError || TEXT['eng'].emptyFormError){
      if(locale === 'id'){
        setErrorText(TEXT['id'].emptyFormError)
      }else{
        setErrorText(TEXT['eng'].emptyFormError)
      }
    }
  }, [locale]);

  const isFormEmpty = ({ name, email, password, confirmPassword }) => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError(true);
      return true;
    }
    setErrorText("");
    setError(false);
    return false;
  };

  const isPasswordAndConfirmPasswordSame = (password, confirmPassword) => {
    if (!(password === confirmPassword)) {
      setErrorText("Password must be the same as confirm password!");
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

  const handleSubmit = async (
    e,
    { name, email, password, confirmPassword }
  ) => {
    e.preventDefault();
    if (isFormEmpty({ name, email, password, confirmPassword })) {
    } else if (!isPasswordAndConfirmPasswordSame(password, confirmPassword)) {
      setIsLoading(true);
      const { error, message } = await register({ name, email, password });
      if (error) {
        setError(true);
        setErrorText(message);
      } else {
        setSuccess(true);
        setSuccesText(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
      setIsLoading(false);
    }
  };

  const renderButtonText = (isLoading) => {
    return isLoading ? (
      <img src={loadingIcon} className="loading-icon" alt="loading icon" />
    ) : (
      TEXT[locale]['register']
    );
  };

  return (
    <RegisterContainer isDarkTheme={theme}>
      <h3>Register</h3>
      <form
        onSubmit={(e) => {
          handleSubmit(e, { name, email, password, confirmPassword });
        }}
      >
        <Input type="text" value={name} onChange={setName} placeholder="Name" />
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
        <Input
          value={confirmPassword}
          type="password"
          onChange={setConfirmPassword}
          placeholder="Confirm Password"
        />
        <button>{renderButtonText(isLoading)}</button>
        {renderErrorText(error, errorText)}
        {renderSuccessText(success, successText)}
      </form>
      <div className="link-wrapper">
        <Link to={`/login`} className="register-link">
          {TEXT[locale]["signUpLink"]}
        </Link>
      </div>
    </RegisterContainer>
  );
};

export default RegisterPage;
