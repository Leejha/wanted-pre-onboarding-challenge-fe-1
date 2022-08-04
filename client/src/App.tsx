import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { PrivateRouting, PublicRouting } from './routes/Routing';
import GlobalStyles from './styles/globalStyles';
import { isLogin } from 'utils/checkLogin';
import { Header } from 'components';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      {isLogin() ? <PrivateRouting /> : <PublicRouting />}
    </QueryClientProvider>
  );
}

export default App;
