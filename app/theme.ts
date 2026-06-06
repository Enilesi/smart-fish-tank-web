import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#050814",
      paper: "rgba(10, 15, 38, 0.72)"
    },
    primary: {
      main: "#1E7BFF"
    },
    secondary: {
      main: "#A735FF"
    },
    text: {
      primary: "#F7F8FF",
      secondary: "#B8C0E0"
    },
    error: {
      main: "#FF4D8D"
    },
    warning: {
      main: "#FFB84D"
    },
    success: {
      main: "#55F2C2"
    }
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    h1: {
      fontWeight: 900,
      letterSpacing: "-0.075em"
    },
    h2: {
      fontWeight: 900,
      letterSpacing: "-0.055em"
    },
    h3: {
      fontWeight: 850,
      letterSpacing: "-0.04em"
    },
    h4: {
      fontWeight: 800,
      letterSpacing: "-0.035em"
    },
    h5: {
      fontWeight: 800,
      letterSpacing: "-0.025em"
    },
    button: {
      textTransform: "none",
      fontWeight: 800
    }
  },
  shape: {
    borderRadius: 28
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#050814"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.45)",
          backdropFilter: "blur(24px)"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingLeft: 24,
          paddingRight: 24,
          minHeight: 46
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 800
        }
      }
    }
  }
});

export default theme;