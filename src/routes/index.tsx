import { Suspense, lazy } from 'react';
// import Home from '../pages/Home';
import Login from '../pages/Login';

const Home = lazy(() => import('../pages/Home'));

const pathConfig = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'home',
    element: (
      <Suspense fallback={<div>登录中...</div>}>
        <Home />
      </Suspense>
    ),
  },
  // {
  //   path: '*',
  //   element: <NoFound />,
  // }
];

export default pathConfig;
