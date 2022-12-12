import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Container from "./Container";

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
}));

const Navbar = ({ title }) => {
  return (
    <NavbarWrapper>
      <Container>
        <h1>{title}</h1>
      </Container>
    </NavbarWrapper>
  );
};

Navbar.defaultProps = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
