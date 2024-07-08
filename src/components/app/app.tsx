import { CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./../header/header";
import { useMemo, useState } from "react";
import { darkTheme, lightTheme } from "../../utils/theme";
import { Route, Routes } from "react-router-dom";
import { EP_ALL, EP_HOME } from "../../utils/constants";
import Home from "../../pages/home/home";
import NotFound from "../../pages/not-found/not-found";

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
      <Routes>
        <Route path={EP_HOME} element={<Home />}></Route>
        <Route path={EP_ALL} element={<NotFound />}></Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
