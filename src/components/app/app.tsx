import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./../header/header";
import { useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme && ["dark", "light"].includes(storedTheme)) {
      setTheme(storedTheme as TTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path={EP_HOME} element={<Home />}></Route>
          <Route path={EP_ALL} element={<NotFound />}></Route>
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default App;
