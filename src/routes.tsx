import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MobileAuth from "./pages/MobileAuth/MobileAuth";
import Profile from "./pages/Profile/Profile";
import SignInOptions from "./pages/SignInOptions/SignInOptions";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInOptions />} />
        <Route path="/signin-phone" element={<MobileAuth />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
