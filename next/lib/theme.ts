import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#1976d2",
  //   },
  // },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
  },
});

export default theme;
