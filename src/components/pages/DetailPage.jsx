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

const ErrorText = styled.p(({theme})=>({
  color: theme.colors.neutral.red,
}))

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
  }, []);

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
    }
    return initializing ? (
      <Middle>
        <img src={loadingIcon} alt="loading icon" />
      </Middle>
    ) : null;
  };

  return (
    <>
      {renderLoading(initializing,initializingError,initializingErrorText)}
      <HomeButton />
    </>
  );
};

export default DetailPage;
