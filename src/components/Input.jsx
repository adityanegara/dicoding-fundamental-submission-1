import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const InputWrapper = styled.input(({ theme, isDarkTheme}) => ({
  backgroundColor:  (isDarkTheme === "light") ? theme.colors.neutral.white : theme.colors.neutral.lightBlack,
  color: (isDarkTheme === "light") ? theme.colors.neutral.black : theme.colors.neutral.white,
  border: `1px solid ${theme.colors.primary.normal}`,
  borderRadius: "10px",
  paddingBottom: "5px",
  textIndent: "5px",
  paddingTop: "5px",
  width: "100%",
  fontSize: "1.1em",
  "&:focus": {
    outline: "none",
    borderColor: theme.colors.primary.darker,
    boxShadow: `0 0 3px ${theme.colors.primary.darker}`,
  },
}));

const Input = ({ value, onChange, placeholder, type }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <InputWrapper
      isDarkTheme={theme}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

Input.defaultProps = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
