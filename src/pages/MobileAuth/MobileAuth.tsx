import React, { FormEvent, useState } from "react";
import { Alert, Button, Typography } from "@mui/material";
import { PhoneInput } from "react-international-phone";
import { PhoneNumberUtil } from "google-libphonenumber";
import "react-international-phone/style.css";

import colors from "../../styles/colors";
import { ERRORS, FORM_TEXTS } from "../../constants/texts";
import SignInContainer from "../../components/SignInContainer/SignInContainer";

import styles from "./MobileAuth.module.css";

interface FormData {
  mobileNumber: string;
}
const MobileAuth: React.FC = () => {
  const phoneUtil = PhoneNumberUtil.getInstance();

  const [formData, setFormData] = useState<FormData>({
    mobileNumber: "",
  });
  const [error, setError] = useState<string | null>(null);

  const validateMobileNumber = (phone: string) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.warn(error.message);
      }
      return false;
    }
  };

  const handleChange = (phone: string) => {
    setError(null);
    setFormData({
      ...formData,
      ["mobileNumber"]: phone,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateMobileNumber(formData.mobileNumber)) {
      setError(ERRORS.invalidPhone);
      return;
    }
  };

  return (
    <SignInContainer>
      <Typography variant="h5" gutterBottom sx={{ color: colors.secondary }}>
        {FORM_TEXTS.mobileAuthTitle}
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className={styles.phoneNumber}>
          <PhoneInput
            defaultCountry="se"
            value={formData.mobileNumber}
            forceDialCode
            onChange={(phone) => handleChange(phone)}
          />
          {error && (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          )}
        </div>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, background: colors.primary }}
        >
          {FORM_TEXTS.proceed}
        </Button>
      </form>
    </SignInContainer>
  );
};

export default MobileAuth;
