import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import styled from "@emotion/styled";
import HomeButton from "../HomeButton";
import Input from "../Input";
import TextArea from "../TextArea";
import loadingIcon from "../../assets/loading.gif";
import { createNote } from "../../api/notesAPI";

const FormWrapper = styled.form(({ theme }) => ({
  marginTop: "3vh",
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  alignItems: "flex-start",
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
  img: {
    width: "15px",
    height: "15px",
    filter:
      "invert(74%) sepia(36%) saturate(6736%) hue-rotate(178deg) brightness(101%) contrast(101%)",
  },
  p: {
    width: "100%",
    textAlign: "center",
  },
  ".error-text": {
    color: theme.colors.neutral.red,
  },
  ".success-text": {
    color: theme.colors.neutral.green,
  },
  ".loading-icon": {
    width: "40px",
    height: "40px",
  },
}));

const CreatePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useInput("");
  const [body, setBody] = useInput("");
  const [formError, setFormError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isFormError = (title, body) => {
    if (title === "" || body === "") {
      setFormError(true);
      setErrorText("Please fill all the inputs!");
      setFormSuccess(false);
      return true;
    }
    setFormError(false);
    return false;
  };

  const renderErrorText = (formError, errorText) => {
    return formError ? <p className="error-text">{errorText}</p> : null;
  };

  const renderButtonText = (isLoading) => {
    return isLoading ? (
      <img src={loadingIcon} className="loading-icon" alt="loading icon" />
    ) : (
      "Create"
    );
  };

  const renderSuccessText = (formSuccess, successText) => {
    return formSuccess ? <p className="success-text">{successText}</p> : null;
  };

  const handleSubmit = async (event, title, body) => {
    event.preventDefault();
    if (isFormError(title, body)) {
    } else {
      setIsLoading(true);
      const { error, message } = await createNote({ title, body });
      setIsLoading(false);
      if (error) {
        setFormError(true);
        setErrorText(message);
      } else {
        setFormSuccess(true);
        setSuccessText(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }
  };

  return (
    <>
      <FormWrapper
        onSubmit={(e) => {
          handleSubmit(e, title, body);
        }}
      >
        <Input
          type="text"
          value={title}
          onChange={setTitle}
          placeholder="Title..."
        />
        <TextArea
          value={body}
          onChange={setBody}
          placeholder="Description..."
          rows="15"
          cols="50"
        />
        <button type="submit">{renderButtonText(isLoading)}</button>
        {renderErrorText(formError, errorText)}
        {renderSuccessText(formSuccess, successText)}
      </FormWrapper>
      <HomeButton />
    </>
  );
};

export default CreatePage;
