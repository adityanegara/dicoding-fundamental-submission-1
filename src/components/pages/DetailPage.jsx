import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import HomeButton from "../HomeButton";
import { getDetailNote } from "../../api/notesAPI";
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
  h3:{
    textAlign: "center",
    fontSize: "1.5em"
  },
  p:{
    lineHeight: "30px",
    textIndent: "50px",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto"
  }
}));

const DetailPage = () => {
  const [initializing, setInitializing] = useState(false);
  const [note, setNote] = useState(null);
  const [initializingError, setInitializingError] = useState(false);
  const [initializingErrorText, setInitializingErrorText] = useState("");

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

  const renderLoading = (
    initializing,
    initializingError,
    initializingErrorText
  ) => {
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
          <p>{note.body}</p>
        </DetailPageContainer>
      );
    }
    return null;
  };

  return (
    <>
      {renderLoading(initializing, initializingError, initializingErrorText)}
      <HomeButton />
    </>
  );
};

export default DetailPage;
