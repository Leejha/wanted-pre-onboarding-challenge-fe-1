import React from 'react';
import { PrivateRouting, PublicRouting } from './routes/Routing';
import GlobalStyles from './styles/globalStyles';
import { isLogin } from 'utils/checkLogin';
import { Header } from 'components';

function App() {
  return (
    <>
      <GlobalStyles />
      {isLogin() ? <PrivateRouting /> : <PublicRouting />}
    </>
  );
}

export default App;
