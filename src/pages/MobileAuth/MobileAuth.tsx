import React, { FormEvent, useState } from "react";
import { Alert, Button, Typography } from "@mui/material";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
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
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
  };
  const phoneUtil = PhoneNumberUtil.getInstance();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

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
const setupRecaptcha = (): void => {
  window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
    size: "invisible",
    callback: (response: unknown) => {
      console.log("reCAPTCHA response: ", response);
    },
  });
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
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(
      auth,
      formData.mobileNumber,
      appVerifier
    )
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window.confirmationResult as any) = confirmationResult;
        console.log("Sign in with phone success", confirmationResult);
        // ...
      })
      .catch((error) => {
        console.log("not sent", error);
        // Error; SMS not sent
        // ...
      });
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
        <div id="sign-in-button"></div>
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
