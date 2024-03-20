// import { React } from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';

const pathConfig = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  // {
  //   path: '*',
  //   element: <NoFound />,
  // }
];

export default pathConfig;
