import { CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./../header/header";
import { useMemo, useState } from "react";
import { darkTheme, lightTheme } from "../../utils/theme";

const App: React.FC = () => {
  const [theme, setTheme] = useState<TTheme>("light");

  const currentTheme = useMemo(
    () => (theme === "light" ? lightTheme : darkTheme),
    [theme]
  );

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Header theme={theme} toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
};

export default App;
