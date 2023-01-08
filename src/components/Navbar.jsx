import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Container from "./Container";
import Switch from "react-switch";
import logoutIcon from "../assets/logout.svg";
import ThemeContext from "../contexts/ThemeContext";
import moonIcon from "../assets/moon.png";
import sunIcon from "../assets/sun.png";

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
    ".button-group": {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      img: {
        position: "relative",
        top: "2px",
        left: "3px",
      },
    },
  },
}));

const Navbar = ({ title, authedUser, logout }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === "dark") {
      setIsDarkTheme(true);
    } else {
      setIsDarkTheme(false);
    }
  }, [theme]);

  const renderLogoutButton = (authedUser) => {
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
          <div className="button-group">
            <Switch
              checkedIcon={<img src={sunIcon} alt="light theme" />}
              uncheckedIcon={<img src={moonIcon} alt="dark theme" />}
              checked={isDarkTheme}
              onChange={toggleTheme}
              onColor={"#1E2225"}
              offColor={"#F3F3F5"}
            />
            {renderLogoutButton(authedUser)}
          </div>
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
