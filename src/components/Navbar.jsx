import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Container from "./Container";
import logoutIcon from "../assets/logout.svg";

const NavbarWrapper = styled.nav(({ theme }) => ({
  backgroundColor: theme.colors.primary.normal,
  width: "100vw",
  paddingTop: "2vh",
  paddingBottom: "2.5vh",
  h1: {
    margin: 0,
    color: theme.colors.neutral.white,
    fontSize: "2.5em",
  },
  ".navbar-content": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    button: {
      borderRadius: "4px",
      cursor: "pointer",
      backgroundColor: "transparent",
      border: "none",
      transition: "ease-in 0.2s",
      img: {
        width: "45px",
        height: "45px",
      },
    },
    "button:hover": {
      backgroundColor: theme.colors.primary.darker,
    },
  },
}));

const Navbar = ({ title, authedUser, logout}) => {
  
  const renderButtonGroup = (authedUser) => {
    return authedUser ? (
      <button onClick={logout}>
        <img alt="logout" src={logoutIcon} />
      </button>
    ) : null;
  };

  return (
    <NavbarWrapper>
      <Container>
        <div className="navbar-content">
          <h1>{title}</h1>
          {renderButtonGroup(authedUser)}
        </div>
      </Container>
    </NavbarWrapper>
  );
};

Navbar.defaultProps = {
  title: PropTypes.string.isRequired,
  authedUser: PropTypes.object,
};

export default Navbar;
