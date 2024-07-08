import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import styles from "./header.module.scss";

interface IHeaderPropps {
  theme: TTheme;
  toggleTheme: () => void;
}

const Header: React.FC<IHeaderPropps> = ({ theme, toggleTheme }) => {
  return (
    <Box className={styles.header}>
      <Typography variant="h3">App-title</Typography>
      <Tooltip
        title={
          theme === "light" ? "Включить темную тему" : "Включить светлую тему"
        }
      >
        <IconButton onClick={toggleTheme} color="inherit">
          {theme === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Header;
