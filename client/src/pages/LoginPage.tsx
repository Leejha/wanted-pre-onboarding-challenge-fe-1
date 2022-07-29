import { AuthLayout, LoginFormContainer } from 'components';
import React from 'react';

function LoginPage() {
  return (
    <AuthLayout>
      <h1>로그인</h1>
      <LoginFormContainer />
    </AuthLayout>
  );
}

export default LoginPage;
