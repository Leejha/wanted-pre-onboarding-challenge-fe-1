import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Path from './Path';

const LoginPage = React.lazy(() => import('pages/LoginPage'));
const SignupPage = React.lazy(() => import('pages/SignupPage'));

function Routing() {
  return (
    <Routes>
      <Route path={Path.LOGIN} element={<LoginPage />} />
      <Route path={Path.SINGUP} element={<SignupPage />} />
    </Routes>
  );
}

export default Routing;
