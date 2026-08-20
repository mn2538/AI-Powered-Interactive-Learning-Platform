import type { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { QuestionPage } from '../pages/QuestionPage';
import { AnswerPage } from '../pages/AnswerPage';

const AppRoutes = (): ReactElement => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/question' element={<QuestionPage />} />
      <Route path='/answer' element={<AnswerPage />} />
    </Routes>
  );
};

export default AppRoutes;
