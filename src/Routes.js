import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Homepage";
import WalletSelection from "./Pages/WalletSelection";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wallet" element={<WalletSelection />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
