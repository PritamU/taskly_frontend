"use client";
import { createTheme } from "@mui/material/styles";

const clientTheme = createTheme({
  palette: {
    primary: {
      light: "#9CBCF5",
      main: "#5991F0",
      contrastText: "#F3F1EF",
      // dark: "#002884",
    },
    secondary: {
      light: "#FFF2F9",
      main: "#FF80C3",
      contrastText: "#F3F1EF",
    },

    text: {
      primary: "#2d3949",
      secondary: "#a5a5a5",
    },
  },
});

export { clientTheme };
