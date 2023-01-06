import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import elipsisOnText from "../helpers/elipsisOnText";
import moment from "moment";
import uiStore from "../store/uiStore";
import { archiveNote, unarchiveNote } from "../api/notesAPI";

const NoteWrapper = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.neutral.white,
  border: `1px solid ${theme.colors.neutral.darkGray}`,
  width: "100%",
  small: {
    fontSize: "0.7em",
    color: theme.colors.neutral.darkGray,
  },
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
    "button, a": {
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
    ".archieve-button": {
      color: theme.colors.primary.normal,
      backgroundColor: theme.colors.neutral.white,
    },
    ".archieve-button:hover": {
      backgroundColor: theme.colors.neutral.gray,
    },
  },
}));

const Note = ({
  id,
  title,
  body,
  createdAt,
  archived,
  handleArchiveOrUnarchive,
}) => {
  const isArchived = uiStore((state) => state.isArchived);

  const handleArchhivebuttonClicked = async (id) => {
    if (isArchived) {
      await unarchiveNote(id);
    } else {
      await archiveNote(id);
    }
    handleArchiveOrUnarchive();
  };

  const renderArchiveButtonText = (archieved) => {
    return archieved ? "Unarchive" : "Archive";
  };

  return (
    <NoteWrapper>
      <div className="note-content">
        <h3>{elipsisOnText(title, 20)}</h3>
        <p>{elipsisOnText(body, 70)}</p>
        <small>
          Created at
          {` ${moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}`}
        </small>
        <div className="button-group">
          <Link to={`/detail/${id}`} className="detail-button">
            Detail
          </Link>
          <button
            className="archieve-button"
            onClick={() => {
              handleArchhivebuttonClicked(id);
            }}
          >
            {renderArchiveButtonText(archived)}
          </button>
        </div>
      </div>
    </NoteWrapper>
  );
};

Note.defaultProps = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  handleArchiveOrUnarchive: PropTypes.func.isRequired,
};

export default Note;
