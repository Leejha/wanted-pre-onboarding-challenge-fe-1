import { login } from 'apis/auth';
import { useInput } from 'hooks';
import React from 'react';
import styled from 'styled-components';
import userStorage from 'utils/userStorage';
import { Button, Input, DividerLine } from 'components/common';
import Path from 'routes/Path';
import { Link } from 'react-router-dom';

function LoginFormContainer() {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      userStorage.set(response.token);
      window.location.replace(Path.HOME);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrapper onSubmit={onLogin}>
      <Input
        type="email"
        width={300}
        height={40}
        value={email}
        placeholder="이메일을 입력해주세요."
        onChange={onChangeEmail}
      />
      <Input
        type="password"
        width={300}
        height={40}
        value={password}
        placeholder="비밀번호를 입력해주세요."
        onChange={onChangePassword}
      />

      <Button width={300} height={40} variant="primary" type="submit">
        로그인
      </Button>

      <DividerLine width="100%" color="#d4d2cf" mt={10} mb={30} />

      <Text>
        아직 회원이 아니신가요?
        <StyledLink to={Path.SINGUP}>회원가입 하기</StyledLink>
      </Text>
    </FormWrapper>
  );
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  input {
    margin-bottom: 10px;
  }
  button {
    margin-bottom: 20px;
  }
`;

const Text = styled.span`
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  color: #4848e9;
  margin-left: 6px;
`;

export default LoginFormContainer;
