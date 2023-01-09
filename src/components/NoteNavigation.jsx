import styled from "@emotion/styled";
import uiStore from "../store/uiStore";
import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import LocaleContext from "../contexts/LocaleContext";
import TEXT from "../constant/text";

const NoteNavigationWrapper = styled.div(({ theme, isDarkTheme}) => ({
  marginTop: "3vh",
  display: "flex",
  gap: "15px",
  button: {
    backgroundColor: (isDarkTheme === "light") ? theme.colors.neutral.gray : theme.colors.neutral.black,
    border: `1px solid`,
    borderColor: (isDarkTheme === "light") ? theme.colors.neutral.gray : theme.colors.neutral.black,
    color: theme.colors.primary.normal,
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    fontSize: "1.1em",
    transition: "ease-in 0.2s",
  },
  "button:hover": {
    backgroundColor: (isDarkTheme === "light") ? theme.colors.neutral.darkgray : theme.colors.neutral.lightBlack,
  },
  ".active": {
    color: theme.colors.neutral.white,
    backgroundColor: theme.colors.primary.normal,
  },
  ".active:hover": {
    backgroundColor: theme.colors.primary.darker,
  },
}));

const NoteNavigation = () => {
  const isArchived = uiStore((state) => state.isArchived);
  const toggleAll = uiStore((state) => state.toggleAll);
  const toggleArchived = uiStore((state) => state.toggleArchived);
  const { theme } = useContext(ThemeContext);
  const { locale } = useContext(LocaleContext);

  return (
    <NoteNavigationWrapper isDarkTheme={theme}>
      <button onClick={toggleAll} className={!isArchived ? "active" : ""}>
        {TEXT[locale]['unarchived']}
      </button>
      <button onClick={toggleArchived} className={isArchived ? "active" : ""}>
        {TEXT[locale]['archived']}
      </button>
    </NoteNavigationWrapper>
  );
};

export default NoteNavigation;
