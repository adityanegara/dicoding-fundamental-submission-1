import { useState } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Checkbox from "react-custom-checkbox";
import HomeButton from "../HomeButton";
import checklistIcon from "../../assets/checklist.svg";
import notesStore from "../../store/noteStore";

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
}));

const InputWrapper = styled.input(({ theme }) => ({
  backgroundColor: theme.colors.neutral.white,
  border: `1px solid ${theme.colors.primary.normal}`,
  borderRadius: "10px",
  paddingBottom: "5px",
  textIndent: "5px",
  paddingTop: "5px",
  width: "100%",
  fontSize: "1.1em",
  "&:focus": {
    outline: "none",
    borderColor: theme.colors.primary.darker,
    boxShadow: `0 0 3px ${theme.colors.primary.darker}`,
  },
}));

const TextAreaWrapper = styled.textarea(({ theme }) => ({
  backgroundColor: theme.colors.neutral.white,
  border: `1px solid ${theme.colors.primary.normal}`,
  borderRadius: "10px",
  paddingBottom: "5px",
  textIndent: "5px",
  paddingTop: "5px",
  width: "100%",
  fontSize: "1.1em",
  "&:focus": {
    outline: "none",
    borderColor: theme.colors.primary.darker,
    boxShadow: `0 0 3px ${theme.colors.primary.darker}`,
  },
}));

const CreatePage = () => {
  const createNote = notesStore((state) => state.createNote);
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [archived, setArchived] = useState(false);
  const [formError, setError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const isFormError = (title, body) => {
    if (title === "" || body === "") {
      setError(true);
      setFormSuccess(false);
      return true;
    }
    setError(false);
    return false;
  };

  const renderErrorText = (formError) => {
    return formError ? (
      <p className="error-text">Please fill all the input!</p>
    ) : null;
  };

  const renderSuccessText = (formSuccess) => {
    return formSuccess ? (
      <p className="success-text">Successfully add note!</p>
    ) : null;
  };

  const handleSubmit = (event, title, body, archived) => {
    event.preventDefault();
    if (isFormError(title, body)) {
    } else {
      createNote(title, body, archived);
      setFormSuccess(true);
    }
  };

  return (
    <>
      <FormWrapper
        onSubmit={(e) => {
          handleSubmit(e, title, body, archived);
        }}
      >
        <InputWrapper
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Title..."
        />
        <TextAreaWrapper
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          placeholder="Description..."
          rows="15"
          cols="50"
        />
        <Checkbox
          icon={
            <img
              src={checklistIcon}
              alt="checklist-icon"
              className="checklist"
            />
          }
          onChange={() => {
            setArchived(!archived);
          }}
          checked={archived}
          borderColor={theme.colors.primary.normal}
          style={{ backgroundColor: theme.colors.neutral.white }}
          label="Archived"
        />
        <button type="submit">Create</button>
        {renderErrorText(formError)}
        {renderSuccessText(formSuccess)}
      </FormWrapper>
      <HomeButton />
    </>
  );
};

export default CreatePage;
