import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2a5d67", // Dark teal
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#a682ff", // Soft violet
    },
    error: {
      main: "#ba1b1d", // Deep red
    },
    background: {
      default: "#f5f5f5", // Light gray
      paper: "#ffffff", // White
    },
    text: {
      primary: "#333333", // Dark text
      secondary: "#2a5d67", // Teal accents
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h4: {
      fontWeight: 800,
      fontSize: "1.6rem",
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;

