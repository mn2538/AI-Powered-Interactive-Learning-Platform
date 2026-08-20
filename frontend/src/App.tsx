import type { ReactElement } from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
