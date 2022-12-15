import styled from "@emotion/styled";
import HomeButton from "../HomeButton";
import Checkbox from "react-custom-checkbox";
import checklistIcon from "../../assets/checklist.svg";
import { useTheme } from "@emotion/react";

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
    width: "100%",
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
  ".delete-button": {
    color: theme.colors.primary.normal,
    backgroundColor: theme.colors.neutral.gray,
  },
  ".delete-button:hover": {
    backgroundColor: theme.colors.neutral.darkGray,
  },
  img: {
    width: "15px",
    height: "15px",
    filter:
      "invert(74%) sepia(36%) saturate(6736%) hue-rotate(178deg) brightness(101%) contrast(101%)",
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
  const theme = useTheme();
  return (
    <>
      <FormWrapper>
        <InputWrapper placeholder="Title..." />
        <TextAreaWrapper placeholder="Description..." rows="15" cols="50" />
        <Checkbox
          icon={
            <img
              src={checklistIcon}
              alt="checklist-icon"
              className="checklist"
            />
          }
          checked={true}
          borderColor={theme.colors.primary.normal}
          style={{ backgroundColor: theme.colors.neutral.white }}
          label="Archived"
        />
        <button type="submit" className="edit-button">Edit</button>
        <button className="delete-button">Delete</button>
      </FormWrapper>
      <HomeButton />
    </>
  );
};

export default DetailPage;
