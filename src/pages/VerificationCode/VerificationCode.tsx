import React, { FormEvent, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

import colors from "../../styles/colors";
import { FORM_TEXTS } from "../../constants/texts";
import SignInContainer from "../../components/SignInContainer/SignInContainer";
// import { useNavigate } from "react-router-dom";
import { UserCredential } from "firebase/auth";

const VerificationCode: React.FC = () => {
  // const navigate = useNavigate();

  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // navigate("/signin-phone");
    window.confirmationResult
      .confirm(verificationCode)
      .then((result: UserCredential) => {
        console.info(result)
      })
      .catch((error: unknown) => {
        console.log("confirmationError");
        console.warn(error);
      });
  };

  return (
    <SignInContainer>
      <Typography variant="h5" gutterBottom sx={{ color: colors.secondary }}>
        {FORM_TEXTS.enterVerificationCode}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="verification-code"
          variant="outlined"
          required
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, background: colors.primary }}
        >
          {FORM_TEXTS.verify}
        </Button>
      </form>
    </SignInContainer>
  );
};

export default VerificationCode;
