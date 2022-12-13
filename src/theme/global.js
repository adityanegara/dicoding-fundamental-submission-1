/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { css } from "@emotion/react/macro";
import theme from "./styledTheme";

const global = css({
  ["body"]: {
    margin: 0,
    backgroundColor: theme.colors.neutral.gray,
    boxSizing: "border-box",
    padding: 0,
    overflowX: "hidden",
    fontFamily: [theme.fonts.secondaryFont, theme.fonts.mainFont],
  },
  ["p"]: {
    margin: "0px",
  },
  ["button, input,"]: {
    fontFamily: [theme.fonts.secondaryFont, theme.fonts.mainFont],
    minWidth: "44px",
    minHeight: "44px",
    padding: "0px",
    margin: "0px",
  },
});

export default global;
