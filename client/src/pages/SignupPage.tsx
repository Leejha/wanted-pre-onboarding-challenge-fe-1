import { AuthLayout, SignupFormContainer } from 'components';
import React from 'react';

function SignupPage() {
  return (
    <AuthLayout title="회원가입">
      <SignupFormContainer />
    </AuthLayout>
  );
}

export default SignupPage;
