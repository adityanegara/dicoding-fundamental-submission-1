import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Container from "./Container";
import Switch from "react-switch";
import logoutIcon from "../assets/logout.svg";
import ThemeContext from "../contexts/ThemeContext";
import LocaleContext from "../contexts/LocaleContext";
import moonIcon from "../assets/moon.svg";
import sunIcon from "../assets/sun.svg";
import englishIcon from "../assets/english.svg";
import indonesiaIcon from "../assets/indonesia.svg";

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
  ".logout-button":{
    width: "45px !important",
    height: "45px !important",
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
        width: "55px",
        height: "55px",
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
        width: "25px",
        height: "25px",
        position: "relative",
        top: "2px",
        left: "3px",
      },
    },
  },
}));

const Navbar = ({ title, authedUser, logout }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isIndonesia, setIsIndonesia] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, toggleLocale } = useContext(LocaleContext);

  useEffect(() => {
    if (theme === "dark") {
      setIsDarkTheme(true);
    } else {
      setIsDarkTheme(false);
    }
  }, [theme]);

  useEffect(() => {
    if (locale === "id") {
      setIsIndonesia(true);
    } else {
      setIsIndonesia(false);
    }
  }, [locale]);

  const renderLogoutButton = (authedUser) => {
    return authedUser ? (
      <button onClick={logout}>
        <img alt="logout" className="logout-button" src={logoutIcon} />
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
              checkedIcon={<img src={indonesiaIcon} alt="Indonesia language" />}
              uncheckedIcon={<img src={englishIcon} alt="English language" />}
              checked={isIndonesia}
              onChange={toggleLocale}
              onColor={"#012169"}
              offColor={"#FF0000"}
            />
            <Switch
              checkedIcon={<img src={moonIcon} alt="dark theme" />}
              uncheckedIcon={<img src={sunIcon} alt="light theme" />}
              checked={isDarkTheme}
              onChange={toggleTheme}
              onColor={"#1E2225"}
              offColor={"#F3F3F5"}
              offHandleColor={"#2d2d30"}
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
  logout: PropTypes.func
};

export default Navbar;
