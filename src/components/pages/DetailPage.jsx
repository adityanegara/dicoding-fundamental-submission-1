import { useState } from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import HomeButton from "../HomeButton";
import Checkbox from "react-custom-checkbox";
import checklistIcon from "../../assets/checklist.svg";
import { useTheme } from "@emotion/react";
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
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.1em",
    transition: "ease-in 0.2s",
  },
  ".edit-button": {
    color: theme.colors.neutral.white,
    backgroundColor: theme.colors.primary.normal,
  },
  ".edit-button:hover": {
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

const DetailPage = () => {
  const { id } = useParams();
  const note = notesStore((state) => state.notes).filter(
    (note) => note.id == id
  )[0];
  const updateNote = notesStore((state) => state.updateNote);
  const theme = useTheme();
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [archived, setArchived] = useState(note.archived);
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

  const handleSubmit = (event, id, title, body, archived) => {
    event.preventDefault();
    if (isFormError(title, body)) {
    } else {
      updateNote({ id, title, body, archived });
      setFormSuccess(true);
    }
  };

  const renderErrorText = (formError) => {
    return formError ? (
      <p className="error-text">Please fill all the input!</p>
    ) : null;
  };

  const renderSuccessText = (formSuccess) => {
    return formSuccess ? (
      <p className="success-text">Successfully edit note!</p>
    ) : null;
  };

  return (
    <>
      <FormWrapper
        onSubmit={(e) => {
          handleSubmit(e, id, title, body, archived);
        }}
      >
        <InputWrapper
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          placeholder="Title..."
        />
        <TextAreaWrapper
          onChange={(e) => {
            setBody(e.target.value);
          }}
          value={body}
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
        <button type="submit" className="edit-button">
          Edit
        </button>
        {renderErrorText(formError)}
        {renderSuccessText(formSuccess)}
      </FormWrapper>
      <HomeButton />
    </>
  );
};

export default DetailPage;
