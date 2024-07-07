// import { Suspense, lazy } from 'react';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Layout from '../layouts';
import AuthRouter from './auth';
import { Navigate } from 'react-router-dom';

// const Home = lazy(() => import('../pages/Home'));
// const Layout = lazy(() => import('../layouts'));

const pathConfig = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <AuthRouter>
        <Layout />
      </AuthRouter>
    ),
    children: [
      {
        path: 'home',
        element: <Home />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/login' />,
  },
];

export default pathConfig;
