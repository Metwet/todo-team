import { Box, Container, Typography } from "@mui/material";
import styles from "./not-found.module.scss";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container maxWidth="lg">
      <Typography
        variant="h2"
        gutterBottom
        className={styles.title}
        sx={{ mt: 10, fontSize: 104 }}
      >
        404
      </Typography>
      <Box className={styles.box} sx={{ fontSize: 34 }}>
        Page not found
      </Box>
      <Box className={styles.box} sx={{ fontSize: 34 }}>
        <Link to="/" className={styles.link}>
          HOME PAGE
        </Link>
      </Box>
    </Container>
  );
};

export default NotFound;
