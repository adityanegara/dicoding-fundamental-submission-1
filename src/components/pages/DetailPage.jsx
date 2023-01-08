import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import HomeButton from "../HomeButton";
import { getDetailNote, deleteNote } from "../../api/notesAPI";
import loadingIcon from "../../assets/loading.gif";
import ThemeContext from "../../contexts/ThemeContext";

const Middle = styled.div({
  marginTop: "3vh",
  display: "flex",
  justifyContent: "center",
  img: {
    width: "100px",
    height: "100px",
  },
});

const ErrorText = styled.p(({ theme }) => ({
  color: theme.colors.neutral.red,
}));

const DetailPageContainer = styled.div(({ theme, isDarkTheme }) => ({
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
  h3: {
    textAlign: "center",
    fontSize: "1.5em",
  },
  ".note-body": {
    lineHeight: "30px",
    textIndent: "50px",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  ".delete-button__container": {
    marginTop: "3vh",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  ".error-text": {
    marginTop: "10px",
    textAlign: "center",
    color: theme.colors.neutral.red,
  },
  ".success-text": {
    marginTop: "10px",
    textAlign: "center",
    color: theme.colors.neutral.green,
  },
}));

const DeleteButton = styled.button(({ theme, isDarkTheme}) => ({
  width: "100%",
  backgroundColor:
    isDarkTheme === "light"
      ? theme.colors.neutral.white
      : theme.colors.neutral.lightBlack,
  border: `1px solid transparent`,
  color: theme.colors.primary.normal,
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1.1em",
  transition: "ease-in 0.2s",
  "&:hover": {
    backgroundColor:
    isDarkTheme === "light"
      ? theme.colors.neutral.gray
      : theme.colors.neutral.lighterBlack,
  },
  ".delete-loading__icon": {
    width: "55px",
  },
}));

const DetailPage = () => {
  const { theme } = useContext(ThemeContext);
  const [initializing, setInitializing] = useState(false);
  const [note, setNote] = useState(null);
  const [initializingError, setInitializingError] = useState(false);
  const [initializingErrorText, setInitializingErrorText] = useState("");
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [successDeleteText, setSuccessDeleteText] = useState("");
  const [errorDelete, setErrorDelete] = useState(false);
  const [errorDeleteText, setErrorDeleteText] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchDetailNote = async (id) => {
      setInitializing(true);
      const { note, error, message } = await getDetailNote(id);
      if (error) {
        setInitializingError(true);
        setInitializingErrorText(message);
      } else {
        setNote(note);
      }
      setInitializing(false);
    };
    fetchDetailNote(id);
  }, [id]);

  const handleDeleteButton = async (id) => {
    setIsDeleteLoading(true);
    setErrorDelete(false);
    const { error, message } = await deleteNote(id);
    setIsDeleteLoading(false);
    if (error) {
      setErrorDelete(true);
      setErrorDeleteText(message);
    } else {
      setSuccessDelete(true);
      setSuccessDeleteText(message);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };
  const renderDeleteError = (errorDelete, errorDeleteText) => {
    return errorDelete ? <p className="error-text">{errorDeleteText}</p> : null;
  };

  const renderSuccessText = (successDelete, successDeleteText) => {
    return successDelete ? (
      <p className="success-text">{successDeleteText}</p>
    ) : null;
  };

  const renderDeleteButtonText = (isDeleteLoading) => {
    return isDeleteLoading ? (
      <img
        className="delete-loading__icon"
        src={loadingIcon}
        alt="loading-icon"
      />
    ) : (
      "Delete"
    );
  };

  const renderDetailPage = ({
    initializing,
    initializingError,
    initializingErrorText,
    id,
  }) => {
    if (initializing) {
      return (
        <Middle>
          <img src={loadingIcon} alt="loading icon" />
        </Middle>
      );
    } else if (initializingError) {
      return (
        <Middle>
          <ErrorText>{initializingErrorText}</ErrorText>
        </Middle>
      );
    } else if (note !== null) {
      return (
        <DetailPageContainer isDarkTheme={theme}>
          <h3>{note.title}</h3>
          <p className="note-body">{note.body}</p>
          <div className="delete-button__container">
            <DeleteButton
              isDarkTheme={theme}
              onClick={() => {
                handleDeleteButton(id);
              }}
            >
              {renderDeleteButtonText(isDeleteLoading)}
            </DeleteButton>
            {renderDeleteError(errorDelete, errorDeleteText)}
            {renderSuccessText(successDelete, successDeleteText)}
          </div>
        </DetailPageContainer>
      );
    }
    return null;
  };

  return (
    <>
      {renderDetailPage({
        id,
        initializing,
        initializingError,
        initializingErrorText,
      })}
      <HomeButton />
    </>
  );
};

export default DetailPage;
