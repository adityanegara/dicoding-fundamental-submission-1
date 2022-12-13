import styled from "@emotion/styled";
import elipsisOnText from "../helpers/elipsisOnText";

const NoteWrapper = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.neutral.white,
  border: `1px solid ${theme.colors.neutral.darkGray}`,
  width: "100%",
  height: "200px",
  [`@media only screen and (min-width: ${theme.layout.desktop})`]: {
    paddingBottom: "5px",
  },
  ".note-content": {
    padding: "15px",
    h3: {
      fontWeight: 500,
    },
  },
  ".button-group": {
    marginTop: "10px",
    display: "flex",
    gap: "5px",
    button: {
      border: `1px solid ${theme.colors.neutral.white}`,
      borderRadius: "5px",
      transition: "ease-in 0.2s",
      fontSize: "1em",
      cursor: "pointer",
      width: "100%",
    },
    ".detail-button": {
      color: theme.colors.neutral.white,
      backgroundColor: theme.colors.primary.normal,
    },
    ".detail-button:hover": {
      backgroundColor: theme.colors.primary.darker,
    },
    ".delete-button": {
      color: theme.colors.primary.normal,
      backgroundColor: theme.colors.neutral.white,
    },
    ".delete-button:hover": {
      backgroundColor: theme.colors.neutral.gray,
    },
  },
}));

const Note = () => {
  return (
    <NoteWrapper>
      <div className="note-content">
        <h3>{elipsisOnText("Judul", 20)}</h3>
        <p>
          {elipsisOnText("Deskripsi...", 80)}
        </p>
        <div className="button-group">
          <button className="detail-button">Detail</button>
          <button className="delete-button">Delete</button>
        </div>
      </div>
    </NoteWrapper>
  );
};

export default Note;
