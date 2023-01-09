import { useSearchParams } from "react-router-dom";
import { useState, useContext, useEffect} from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import searchIcon from "../assets/search.svg";
import ThemeContext from "../contexts/ThemeContext";

const SearchInputWrapper = styled.div(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  gap: "15px",
  button: {
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    width: "10%",
    img: {
      position: "relative",
      top: "10px",
      width: "35px",
      height: "35px",
      filter:
        "invert(74%) sepia(36%) saturate(6736%) hue-rotate(178deg) brightness(101%) contrast(101%)",
      transition: "ease-in 0.2s",
    },
  },
  "button:hover": {
    img: {
      filter:
        "invert(75%) sepia(45%) saturate(7376%) hue-rotate(178deg) brightness(97%) contrast(84%)",
    },
  },
}));

const InputWrapper = styled.input(({ theme, isDarkTheme}) => ({
  backgroundColor:  (isDarkTheme === "light") ? theme.colors.neutral.white : theme.colors.neutral.lightBlack,
  color: (isDarkTheme === "light") ? theme.colors.neutral.black : theme.colors.neutral.white,
  border: `1px solid ${theme.colors.primary.normal}`,
  borderRadius: "10px",
  paddingLeft: "5px",
  paddingRight: "5px",
  paddingTop: "5px",
  paddingBottom: "5px",
  width: "85%",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "3vh",
  fontSize: "1.1em",
  transition: "ease-in 0.2s",
  "&:focus": {
    outline: "none",
    borderColor: theme.colors.primary.darker,
    boxShadow: `0 0 3px ${theme.colors.primary.darker}`,
  },
}));

const SearchInput = ({ placeHolder }) => {
  const [input, setInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useContext(ThemeContext);
  useEffect(()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const title = urlParams.get('title');
    setInput(title);
  }, [])
  return (
    <SearchInputWrapper>
      <InputWrapper
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder={placeHolder}
        isDarkTheme={theme}
      />
      <button
        onClick={() => {
          const title = (input === "undefined") ? "" : input;
          setSearchParams({ title: title });
        }}
        aria-label="Search"
      >
        <img alt="search-icon" src={searchIcon} />
      </button>
    </SearchInputWrapper>
  );
};

SearchInput.defaultProps = {
  placeHolder: PropTypes.string.isRequired,
};

export default SearchInput;
