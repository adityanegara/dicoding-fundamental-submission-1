import { useState } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useInput from "../../hooks/useInput";
import HomeButton from "../HomeButton";
import Checkbox from "react-custom-checkbox";
import checklistIcon from "../../assets/checklist.svg";
import Input from "../Input";
import TextArea from "../TextArea";
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

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const note = notesStore((state) => state.notes).filter(
    (note) => note.id == id
  )[0];
  const updateNote = notesStore((state) => state.updateNote);
  const theme = useTheme();
  const [title, setTitle] = useInput(note.title);
  const [body, setBody] = useInput(note.body);
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
      navigate("/");
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
        <Input type="text" onChange={setTitle} value={title} placeholder="Title..." />
        <TextArea
          onChange={setBody}
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
