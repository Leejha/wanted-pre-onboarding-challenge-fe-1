import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Path from './Path';
import { useNavigate } from 'react-router-dom';

const LoginPage = React.lazy(() => import('pages/LoginPage'));
const SignupPage = React.lazy(() => import('pages/SignupPage'));
const HomePage = React.lazy(() => import('pages/HomePage'));

function AuthNavigation() {
  const naviate = useNavigate();
  return (
    <div>
      <h1>로그인 후 이용해주세요</h1>
      <button onClick={() => naviate(Path.LOGIN)}>로그인 하러 가기</button>
    </div>
  );
}

export function PrivateRouting() {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path={Path.HOME} element={<HomePage />} />
        <Route path={Path.HOMEDETAIL} element={<HomePage />} />
        <Route path="*" element={<Navigate replace to={Path.HOME} />} />
      </Routes>
    </Suspense>
  );
}

export function PublicRouting() {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path={Path.LOGIN} element={<LoginPage />} />
        <Route path={Path.SINGUP} element={<SignupPage />} />
        <Route path="*" element={<AuthNavigation />} />
      </Routes>
    </Suspense>
  );
}
