import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import CreateButton from "../CreateButtton";
import SearchInput from "../SearchInput";
import NoteNavigation from "../NoteNavigation";
import Note from "../Note";
import uiStore from "../../store/uiStore";
import { useSearchParams } from "react-router-dom";
import { getNotes } from "../../api/notesAPI";
import loadingIcon from "../../assets/loading.gif";

const LoadingWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  img: {
    width: "100px",
    height: "100px",
  },
});

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

const ErrorNote = styled.p(({ theme }) => ({
  textAlign: "center",
  fontSize: "1.3em",
  color: theme.colors.neutral.red,
}));

const HomePage = () => {
  const isArchived = uiStore((state) => state.isArchived);
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchParams] = useSearchParams();
  const [initializing, setInitializing] = useState(false);
  const [errorText, setErrorText] = useState("");

  const fetchNotes = async () => {
    setInitializing(true);
    const { data, message, error } = await getNotes();
    setNotes(data);
    setInitializing(false);
    if (error) {
      setErrorText(message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);


  const filterSearchInput = (searchInput, notes) => {
    let keyword = searchInput;
    if (searchInput === null) {
      keyword = "";
    }
    return notes.filter((note) => {
      if (note.title.toLowerCase().includes(keyword.toLowerCase())) {
        return note;
      }
    });
  };
  const filterNote = (searchInput, notes, isArchived) => {
    if (isArchived) {
      const archivedNotes = notes.filter((note) => note.archived === true);
      return filterSearchInput(searchInput, archivedNotes);
    }
    return filterSearchInput(searchInput, notes);
  };

  const renderNotes = (notes) => {
    return notes.map((note) => (
      <Note
        key={note.id}
        id={note.id}
        title={note.title}
        body={note.body}
        isEdited={note.isEdited}
        createdAt={note.createdAt}
        handleArchiveOrUnarchive={fetchNotes}
      />
    ));
  };

  const renderEmptyText = (notes) => {
    return notes.length === 0 ? <EmptyNote>There is no note.</EmptyNote> : null;
  };

  const renderHomepage = (initializing) => {
    if (initializing) {
      return (
        <LoadingWrapper>
          <img src={loadingIcon} alt="loading icon" />
        </LoadingWrapper>
      );
    } else if (errorText !== "") {
      return <ErrorNote>{errorText}</ErrorNote>;
    } else {
      return (
        <>
          <SearchInput
            placeHolder="Search notes..."
            inputValue={inputValue}
            setValue={setInputValue}
          />
          <NoteNavigation />
          <NoteContainer>
            {renderNotes(
              filterNote(searchParams.get("title"), notes, isArchived)
            )}
          </NoteContainer>
          {renderEmptyText(notes)}
          <CreateButton />
        </>
      );
    }
  };

  return renderHomepage(initializing);
};

export default HomePage;
