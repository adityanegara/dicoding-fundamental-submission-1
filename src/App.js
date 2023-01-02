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

const AppContainer = styled.div({
  paddingBottom: "10vh",
});

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Global styles={global} />
        <AppContainer>
          <Navbar title="Note" />
          <Container>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/detail/:id" element={<DetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </Container>
        </AppContainer>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
