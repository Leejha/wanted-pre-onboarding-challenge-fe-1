import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import Path from './Path';

function Routing() {
  return (
    <Routes>
      <Route path={Path.LOGIN} element={<LoginPage />} />
      <Route path={Path.SINGUP} element={<SignupPage />} />
    </Routes>
  );
}

export default Routing;
