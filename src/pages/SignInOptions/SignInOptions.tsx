import React, { FormEvent } from "react";
import { Button, Typography } from "@mui/material";

import colors from "../../styles/colors";
import { FORM_TEXTS } from "../../constants/texts";
import SignInContainer from "../../components/SignInContainer/SignInContainer";
import { useNavigate } from "react-router-dom";

const SignInOptions: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/signin-phone");
  };

  return (
    <SignInContainer>
      <Typography variant="h5" gutterBottom sx={{ color: colors.secondary }}>
        {FORM_TEXTS.selectSignInOption}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, background: colors.primary }}
        >
          {FORM_TEXTS.signInWithPhone}
        </Button>
      </form>
    </SignInContainer>
  );
};

export default SignInOptions;
