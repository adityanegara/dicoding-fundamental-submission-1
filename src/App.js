import { Global } from "@emotion/react";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./theme/styledTheme";
import global from "./theme/global";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import CreateButton from "./components/CreateButtton";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Global styles={global} />
        <Navbar title="Note" />
        <Container>
          <Routes>
            <Route path="/" element={<div><CreateButton/></div>}/>
            <Route path="/create" element={<div>Create</div>}/>
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
