import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import homeIcon from "../assets/home.svg";

const LinkWrapper = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.colors.primary.normal,
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  position: "fixed",
  transition: "ease-in 0.2s",
  bottom: "35px",
  right: "35px",
  "&:hover": {
    backgroundColor: theme.colors.primary.darker,
  },
  "img": {
    filter: "invert(99%) sepia(1%) saturate(355%) hue-rotate(308deg) brightness(121%) contrast(90%)",
    color: "white",
    width: "25px",
    height: "25px",
  }
}));

const HomeButton = () => {
  return <LinkWrapper to="/"><img src={homeIcon} alt="create"/></LinkWrapper>;
};

export default HomeButton;
