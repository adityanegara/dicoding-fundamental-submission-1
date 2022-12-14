import styled from "@emotion/styled";
import PropTypes from "prop-types";
import searchIcon from "../assets/search.svg";

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

const InputWrapper = styled.input(({ theme }) => ({
  backgroundColor: theme.colors.neutral.white,
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
  "&:focus": {
    outline: "none",
    borderColor: theme.colors.primary.darker,
    boxShadow: `0 0 3px ${theme.colors.primary.darker}`,
  },
}));

const SearchInput = ({ inputValue, setValue, placeHolder }) => {
  return (
    <SearchInputWrapper>
      <InputWrapper
        value={inputValue}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder={placeHolder}
      />
      <button aria-label="Search">
        <img alt="search-icon" src={searchIcon} />
      </button>
    </SearchInputWrapper>
  );
};

SearchInput.defaultProps = {
  inputValue: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  placeHolder: PropTypes.string.isRequired,
};

export default SearchInput;
