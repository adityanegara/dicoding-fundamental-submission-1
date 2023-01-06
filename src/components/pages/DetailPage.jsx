import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import HomeButton from "../HomeButton";
import { getDetailNote, deleteNote } from "../../api/notesAPI";
import loadingIcon from "../../assets/loading.gif";

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

const DetailPageContainer = styled.div(({ theme }) => ({
  marginTop: "5vh",
  paddingBottom: "5vh",
  backgroundColor: theme.colors.neutral.white,
  border: `1px solid ${theme.colors.neutral.darkGray}`,
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

const DeleteButton = styled.button(({ theme }) => ({
  width: "100%",
  border: `1px solid ${theme.colors.neutral.white}`,
  color: theme.colors.primary.normal,
  backgroundColor: theme.colors.neutral.white,
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1.1em",
  transition: "ease-in 0.2s",
  "&:hover": {
    backgroundColor: theme.colors.neutral.gray,
  },
  ".delete-loading__icon": {
    width: "55px",
  },

}));

const DetailPage = () => {
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
    return successDelete ? <p className="success-text">{successDeleteText}</p> : null;
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
        <DetailPageContainer>
          <h3>{note.title}</h3>
          <p className="note-body">{note.body}</p>
          <div className="delete-button__container">
            <DeleteButton
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
