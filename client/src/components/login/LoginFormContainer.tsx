import { useInput } from 'hooks';
import React from 'react';
import styled from 'styled-components';

function LoginFormContainer() {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  return (
    <FormWrapper>
      <input type="text" value={email} onChange={onChangeEmail} />
      <input type="password" value={password} onChange={onChangePassword} />
      <button>로그인</button>
    </FormWrapper>
  );
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

export default LoginFormContainer;
