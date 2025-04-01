import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

import useViewport from './hooks/useViewport';
import Layout from './layouts/Layout';
import MobileLayout from './layouts/MobileLayout';
import PrivateRoute from './layouts/PrivateRoute';
import AdminPage from './pages/Admin';
import FilteringManage from './pages/Admin/Filtering';
import ReportManage from './pages/Admin/Report';
import AdminRollingPaper from './pages/Admin/RollingPaper';
import AdminRoute from './layouts/AdminRoute';
import AuthCallbackPage from './pages/Auth';
import Home from './pages/Home';
import Landing from './pages/Landing';
import LetterBoardPage from './pages/LetterBoard';
import LetterBoardDetailPage from './pages/LetterBoardDetail';
import LetterBoxPage from './pages/LetterBox';
import LetterBoxDetailPage from './pages/LetterBoxDetail';
import LetterDetailPage from './pages/LetterDetail';
import LoginPage from './pages/Login';
import MyPage from './pages/MyPage';
import MyBoardPage from './pages/MyPage/components/MyBoardPage';
import NotFoundPage from './pages/NotFound';
import NotificationsPage from './pages/Notifications';
import OnboardingPage from './pages/Onboarding';
import RandomLettersPage from './pages/RandomLetters';
import RollingPaperPage from './pages/RollingPaper';
import WritePage from './pages/Write';
import ShareApprovalPage from './pages/Share';
import useThemeStore from './stores/themeStore';

// const Layout = lazy(() => import('./layouts/Layout'));
// const MobileLayout = lazy(() => import('./layouts/MobileLayout'));
// const PrivateRoute = lazy(() => import('./layouts/PrivateRoute'));
// const AuthCallbackPage = lazy(() => import('./pages/Auth'));

// const AdminPage = lazy(() => import('./pages/Admin'));
// const FilteringManage = lazy(() => import('./pages/Admin/Filtering'));
// const ReportManage = lazy(() => import('./pages/Admin/Report'));
// const AdminRollingPaper = lazy(() => import('./pages/Admin/RollingPaper'));
// const AdminRoute = lazy(() => import('./layouts/AdminRoute'));
// const Home = lazy(() => import('./pages/Home'));
// const Landing = lazy(() => import('./pages/Landing'));
// const LetterBoardPage = lazy(() => import('./pages/LetterBoard'));
// const LetterBoardDetailPage = lazy(() => import('./pages/LetterBoardDetail'));
// const LetterBoxPage = lazy(() => import('./pages/LetterBox'));
// const LetterBoxDetailPage = lazy(() => import('./pages/LetterBoxDetail'));
// const LetterDetailPage = lazy(() => import('./pages/LetterDetail'));
// const LoginPage = lazy(() => import('./pages/Login'));
// const MyPage = lazy(() => import('./pages/MyPage'));
// const MyBoardPage = lazy(() => import('./pages/MyPage/components/MyBoardPage'));
// const NotFoundPage = lazy(() => import('./pages/NotFound'));
// const NotificationsPage = lazy(() => import('./pages/Notifications'));
// const OnboardingPage = lazy(() => import('./pages/Onboarding'));
// const RandomLettersPage = lazy(() => import('./pages/RandomLetters'));
// const RollingPaperPage = lazy(() => import('./pages/RollingPaper'));
// const WritePage = lazy(() => import('./pages/Write'));
// const ShareApprovalPage = lazy(() => import('./pages/Share'));
// const useThemeStore = lazy(() => import('./stores/themeStore'));

const App = () => {
  const theme = useThemeStore((state) => state.theme);
  useViewport();

  const initializeTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  initializeTheme();

  return (
    <Suspense fallback={<div>로딩중</div>}>
      <Routes>
        <Route element={<MobileLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="landing" element={<Landing />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="auth-callback" element={<AuthCallbackPage />} />
          <Route path="onboarding" element={<OnboardingPage />} />

          <Route element={<PrivateRoute />}>
            <Route index element={<Home />} />
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
              <Route path="share/:shareProposalId" element={<ShareApprovalPage />} />
            </Route>
            <Route path="mypage" element={<Layout />}>
              <Route index element={<MyPage />} />
              <Route path="board" element={<MyBoardPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
            </Route>
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="admin" element={<AdminPage />}>
            <Route path="report" element={<ReportManage />} />
            <Route path="badwords" element={<FilteringManage />} />
            <Route path="rolling-paper" element={<AdminRollingPaper />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
