import { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Global } from "@emotion/react";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styledTheme from "./theme/styledTheme";
import { globalLight, globalDark } from "./theme/global";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import HomePage from "./components/pages/Homepage";
import CreatePage from "./components/pages/CreatePage";
import DetailPage from "./components/pages/DetailPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import { putAccessToken } from "./api/notesAPI";
import { getUserLogged } from "./api/notesAPI";
import ThemeContext from "./contexts/ThemeContext";

const AppContainer = styled.div({
  paddingBottom: "10vh",
});

const App = () => {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "light";
  });

  useEffect(() => {
    const fetchUserLogged = async () => {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    };
    fetchUserLogged();
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
  };

  const renderRoutes = (authedUser) => {
    return !authedUser ? (
      <Routes>
        <Route
          path="/*"
          element={<LoginPage loginSuccess={onLoginSuccess} />}
        />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    ) : (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    );
  };

  if (initializing) {
    return null;
  }

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={themeContextValue}>
        <ThemeProvider theme={styledTheme}>
          <Global
            styles={() => {
              return theme === "light" ? globalLight : globalDark;
            }}
          />
          <AppContainer>
            <Navbar title="Note" authedUser={authedUser} logout={onLogout} />
            <Container>{renderRoutes(authedUser)}</Container>
          </AppContainer>
        </ThemeProvider>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
};

export default App;
