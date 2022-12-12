import PropTypes from "prop-types";
import styled from "@emotion/styled";

const ContainerWrapper = styled.div(({ theme }) => ({
  width: "90%",
  marginLeft: "auto",
  marginRight: "auto",
  [`@media only screen and (min-width: ${theme.layout.tablet})`]: {
    width: "80%",
  },
  [`@media only screen and (min-width: ${theme.layout.desktop})`]: {
    width: "70%",
  },
}));

const Container = ({ children }) => {
  return <ContainerWrapper>{children}</ContainerWrapper>;
};

Container.defaultProps = {
  children: PropTypes.node.isRequired,
};

export default Container;
