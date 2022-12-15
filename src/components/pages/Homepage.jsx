import { useState } from "react";
import styled from "@emotion/styled";
import CreateButton from "../CreateButtton";
import SearchInput from "../SearchInput";
import NoteNavigation from "../NoteNavigation";
import Note from "../Note";

const HomePage = () => {
  const [inputValue, setInputValue] = useState("");

  const NoteContainer = styled.ul(({ theme }) => ({
    listStyleType: "none",
    margin: "3vh 0px 0px 0px",
    padding: "0px",
    display: "grid",
    gridTemplateColumns: "1fr",
    rowGap: "15px",
    [`@media only screen and (min-width: ${theme.layout.tablet})`]: {
      gridTemplateColumns: "1fr 1fr",
      columnGap: "15px",
    },
    [`@media only screen and (min-width: ${theme.layout.desktop})`]: {
      marginTop: "5vh",
      gridTemplateColumns: "1fr 1fr 1fr",
    },
  }));
  return (
    <>
      <SearchInput
        placeHolder="Search notes..."
        inputValue={inputValue}
        setValue={setInputValue}
      />
      <NoteNavigation />
      <NoteContainer>
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
      </NoteContainer>

      <CreateButton />
    </>
  );
};

export default HomePage;
