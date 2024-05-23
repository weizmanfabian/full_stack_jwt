import React from 'react';
import PrincipalRoute from './routes/PrincipalRoute';
import { AuthProvider } from './context/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <PrincipalRoute />
    </AuthProvider>
  );
};

export default App;
