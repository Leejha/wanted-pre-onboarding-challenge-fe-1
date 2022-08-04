import { AuthLayout, LoginFormContainer } from 'components';
import React from 'react';

function LoginPage() {
  return (
    <AuthLayout title="로그인">
      <LoginFormContainer />
    </AuthLayout>
  );
}

export default LoginPage;
