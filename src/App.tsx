import { Route, Routes } from 'react-router';

import useViewport from './hooks/useViewport';
import Layout from './layouts/Layout';
import MobileLayout from './layouts/MobileLayout';
import AdminPage from './pages/Admin';
import FilteredLetterManage from './pages/Admin/FilteredLetter';
import FilteringManage from './pages/Admin/Filtering';
import ReportManage from './pages/Admin/Report';
import Home from './pages/Home';
import Landing from './pages/Landing';
import LetterBoardPage from './pages/LetterBoard';
import LetterBoardDetailPage from './pages/LetterBoardDetail';
import LetterBoxPage from './pages/LetterBox';
import LetterBoxDetailPage from './pages/LetterBoxDetail';
import LetterDetailPage from './pages/LetterDetail';
import LoginPage from './pages/Login';
import MyPage from './pages/MyPage';
import NotFoundPage from './pages/NotFound';
import NotificationsPage from './pages/Notifications';
import OnboardingPage from './pages/Onboarding';
import RandomLettersPage from './pages/RandomLetters';
import RollingPaperPage from './pages/RollingPaper';
import WritePage from './pages/Write';

const App = () => {
  useViewport();

  return (
    <Routes>
      <Route element={<MobileLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="landing" element={<Landing />} />
        <Route path="onboarding" element={<OnboardingPage />} />
        <Route path="letter">
          <Route element={<Layout />}>
            <Route path="random" element={<RandomLettersPage />} />
            <Route path="box" element={<LetterBoxPage />} />
            <Route path="box/:id" element={<LetterBoxDetailPage />} />
          </Route>
          <Route path="write" element={<WritePage />} />
          <Route path=":id" element={<LetterDetailPage />} />
        </Route>
        <Route path="board">
          <Route element={<Layout />}>
            <Route path="rolling/:id" element={<RollingPaperPage />} />
            <Route path="letter" element={<LetterBoardPage />} />
          </Route>
          <Route path="letter/:id" element={<LetterBoardDetailPage />} />
        </Route>
        <Route path="mypage" element={<Layout />}>
          <Route index element={<MyPage />} />
          <Route path="board" element={<LetterBoardPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>

      <Route path="admin" element={<AdminPage />}>
        <Route path="report" element={<ReportManage />} />
        <Route path="badwords" element={<FilteringManage />} />
        <Route path="filtered-letter" element={<FilteredLetterManage />} />
      </Route>
    </Routes>
  );
};

export default App;
