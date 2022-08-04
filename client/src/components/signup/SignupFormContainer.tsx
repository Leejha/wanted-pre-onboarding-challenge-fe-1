import { signup } from 'apis/auth';
import { useInput } from 'hooks';
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Path from 'routes/Path';
import styled from 'styled-components';
import userStorage from 'utils/userStorage';
import { Input, Button, DividerLine } from 'components/common';

function checkEmailValidation(email: string) {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regexEmail.test(String(email).toLowerCase());
  // return regexEmail.test(email);
}

function SignupFormContainer() {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordConfirm, onChangePasswordConfirm] = useInput('');

  const [validForm, setValidForm] = useState({
    emailValid: false,
    passwordValid: false,
  });

  const { emailValid, passwordValid } = validForm;

  useEffect(() => {
    setValidForm((prev) => ({
      passwordValid: password.length >= 8 && passwordConfirm === password,
      emailValid: checkEmailValidation(email),
    }));
  }, [email, password, passwordConfirm]);

  const isDisabled = useMemo(
    () => !emailValid || !passwordValid,
    [emailValid, passwordValid]
  );

  console.log(validForm.emailValid, validForm.passwordValid);

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const response = await signup({ email, password });
      userStorage.set(response.token);
      window.location.replace(Path.HOME);
    } catch (e) {
      console.log(e);
    }
  };

  console.log({ isDisabled });

  return (
    <FormWrapper onSubmit={onSignup}>
      <Input
        width={300}
        height={40}
        type="email"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={onChangeEmail}
      />
      <Input
        width={300}
        height={40}
        placeholder="비밀번호를 입력해주세요."
        type="password"
        value={password}
        onChange={onChangePassword}
      />
      <Input
        width={300}
        height={40}
        type="password"
        placeholder="비밀번호를 다시 입력해주세요."
        value={passwordConfirm}
        onChange={onChangePasswordConfirm}
      />
      <Button
        width={300}
        height={40}
        variant="primary"
        type="submit"
        disabled={isDisabled}
      >
        회원가입
      </Button>

      <DividerLine width="100%" color="#d4d2cf" mt={10} mb={30} />

      <Text>
        이미 회원이신가요?
        <StyledLink to={Path.LOGIN}>로그인 하기</StyledLink>
      </Text>
    </FormWrapper>
  );
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  input {
    margin-bottom: 12px;
  }
  button {
    margin: 15px 0;
  }
`;

const Text = styled.span`
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  color: #4848e9;
  margin-left: 6px;
`;

export default SignupFormContainer;
