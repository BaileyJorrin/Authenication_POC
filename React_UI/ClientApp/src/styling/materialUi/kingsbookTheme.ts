import { Divider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#004976",
      light: "#6699c2",
    },
    secondary: {
      main: "#7b9e6b",
      light: "#b7e394",
    },
    info: {
      main: "#646569",
      light: "#cac8c8",
    },
    success: {
      main: "#7b9e6b",
      contrastText: "#7b9e6b",
    },
  },
  typography: {
    fontFamily: "Source Sans Pro",
    button: {
      fontWeight: 500,
      textTransform: "none",
      fontSize: 15,
    },
    fontWeightBold: 600,
    h1: {
      fontWeight: 700,
      fontSize: 72,
    },
    h2: {
      color: "#646569",
      fontWeight: 400,
      fontSize: 36,
    },
    h3: {
      color: "#646569",
      fontWeight: "lighter",
      fontSize: 32,
    },
  },
});
