import { FC, ReactNode } from "react";
import { Container } from "@mui/material";

import colors from "../../styles/colors";
import styles from "./SignInContainer.module.css";

const SignInContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          bgcolor: colors,
          height: "50vh",
        }}
      >
        {children}
      </Container>
    </div>
  );
};

export default SignInContainer;
