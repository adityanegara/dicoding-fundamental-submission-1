import styled from "@emotion/styled";
import PropTypes from "prop-types";

const NoteNavigationWrapper = styled.div(({ theme }) => ({
  marginTop: "3vh",
  display: "flex",
  gap: "15px",
  "button":{
    backgroundColor: theme.colors.neutral.gray,
    border: `1px solid ${theme.colors.neutral.gray}`,
    color: theme.colors.primary.normal,
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    fontSize: "1.1em",
    transition: "ease-in 0.2s",
  },
  "button:hover":{
    backgroundColor: theme.colors.neutral.darkGray,
  },
  ".active":{
    color: theme.colors.neutral.white,
    backgroundColor: theme.colors.primary.normal,
  },
  ".active:hover":{
    backgroundColor: theme.colors.primary.darker,
  }
}));

const NoteNavigation = () => {
  return (
    <NoteNavigationWrapper>
      <button className="active">All</button>
      <button>Archived</button>
    </NoteNavigationWrapper>
  );
};

export default NoteNavigation;
