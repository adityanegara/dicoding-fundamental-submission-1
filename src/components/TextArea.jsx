import styled from "@emotion/styled";

const TextAreaWrapper = styled.textarea(({ theme }) => ({
  backgroundColor: theme.colors.neutral.white,
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

const TextArea = ({ value, onChange, placeholder }) => {
  return (
    <TextAreaWrapper
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows="15"
      cols="50"
    />
  );
};

export default TextArea;
