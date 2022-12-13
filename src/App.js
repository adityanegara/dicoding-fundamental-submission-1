import styled from "@emotion/styled";
import { Global } from "@emotion/react";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./theme/styledTheme";
import global from "./theme/global";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Homepage from "./components/pages/Homepage";

const AppContainer = styled.div({
  paddingBottom: "10vh",
})

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Global styles={global} />
        <AppContainer>
        <Navbar title="Note" />
        <Container>
          <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/create" element={<div>Create</div>}/>
          </Routes>
        </Container>
        </AppContainer>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
