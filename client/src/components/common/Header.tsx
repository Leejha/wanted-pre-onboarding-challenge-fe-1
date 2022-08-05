import React from 'react';
import { useNavigate } from 'react-router-dom';
import Path from 'routes/Path';
import styled from 'styled-components';
import { isLogin } from 'utils/checkLogin';
import userStorage from 'utils/userStorage';
import Button from './Button';

function Header() {
  const navigate = useNavigate();
  const onLogout = () => {
    window.location.replace(Path.LOGIN);

    console.log('logout');

    userStorage.remove();
  };

  return (
    <HeaderStyled>
      <Inner>
        <span className="logo" onClick={() => navigate(Path.HOME)}>
          Wanted
        </span>
        {isLogin() ? (
          <span onClick={onLogout}>로그아웃</span>
        ) : (
          <Button variant="secondary">로그인</Button>
        )}
      </Inner>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.header`
  width: 100%;
  border-bottom: 1px solid #d4d2cf;
  font-size: 14px;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1070px;
  height: 50px;

  margin: 0 auto;
  span {
    cursor: pointer;
  }
  .logo {
    font-weight: bold;
  }
`;

export default Header;
