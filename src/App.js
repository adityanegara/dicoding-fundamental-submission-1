import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Global } from "@emotion/react";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./theme/styledTheme";
import global from "./theme/global";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import HomePage from "./components/pages/Homepage";
import CreatePage from "./components/pages/CreatePage";
import DetailPage from "./components/pages/DetailPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import { putAccessToken } from "./api/notesAPI";
import { getUserLogged } from "./api/notesAPI";

const AppContainer = styled.div({
  paddingBottom: "10vh",
});

const App = () => {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const fetchUserLogged = async () => {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    };
    fetchUserLogged();
  }, []);

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
      <ThemeProvider theme={theme}>
        <Global styles={global} />
        <AppContainer>
          <Navbar title="Note" authedUser={authedUser} logout={onLogout} />
          <Container>{renderRoutes(authedUser)}</Container>
        </AppContainer>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
