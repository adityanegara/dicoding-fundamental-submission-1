import styled from "@emotion/styled";
import useInput from "../../hooks/useInput";
import Input from "../Input";
import { Link } from "react-router-dom";
import { useState } from "react";

const RegisterContainer = styled.div(({ theme }) => ({
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

const RegisterPage = () => {
  const [name, setName] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [confirmPassword, setConfirmPassword] = useInput("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const isFormEmpty = ({ name, email, password, confirmPassword }) => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setErrorText("Please fill all the input!");
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

  const renderErrorText = (error) => {
    return error ? <p>{errorText}</p> : null;
  };

  const handleSubmit = (e, { name, email, password, confirmPassword }) => {
    e.preventDefault();
    if (isFormEmpty({ name, email, password, confirmPassword })) {
    } else {
      if (isPasswordAndConfirmPasswordSame(password, confirmPassword)) {
      }
      console.log(email);
      console.log(password);
    }
  };

  return (
    <RegisterContainer>
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
        <button>Register</button>
        {renderErrorText(error)}
      </form>
      <div className="link-wrapper">
        <Link to={`/login`} className="register-link">
          Have an account already? Log in
        </Link>
      </div>
    </RegisterContainer>
  );
};

export default RegisterPage;
