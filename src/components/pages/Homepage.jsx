import { useState } from "react";
import styled from "@emotion/styled";
import CreateButton from "../CreateButtton";
import SearchInput from "../SearchInput";
import NoteNavigation from "../NoteNavigation";
import Note from "../Note";
import notesStore from "../../store/noteStore";
import uiStore from "../../store/uiStore";

const HomePage = () => {
  const isArchived = uiStore((state) => state.isArchived);
  const notes = notesStore((state) => state.notes);
  const [inputValue, setInputValue] = useState("");

  const filterNote = (notes, isArchived) => {
    if (isArchived) {
      return notes.filter((note) => note.archived === true);
    }
    return notes;
  };

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

  const EmptyNote = styled.p({
    textAlign: "center",
    fontSize: "1.3em",
  });

  const renderNotes = (notes) => {
    return notes.map((note) => (
      <Note
        key={note.id}
        id={note.id}
        title={note.title}
        body={note.body}
        isEdited={note.isEdited}
        createdAt={note.createdAt}
      />
    ));
  };

  const renderEmptyText = (notes) => {
    return notes.length === 0 ? <EmptyNote>There is no note.</EmptyNote> : null;
  };

  return (
    <>
      <SearchInput
        placeHolder="Search notes..."
        inputValue={inputValue}
        setValue={setInputValue}
      />
      <NoteNavigation />
      <NoteContainer>
        {renderNotes(filterNote(notes, isArchived))}
      </NoteContainer>
      {renderEmptyText(notes)}
      <CreateButton />
    </>
  );
};

export default HomePage;
