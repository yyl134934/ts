import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import router from './routes';
import './app.css';

function App() {
  const routes = createBrowserRouter(router);
  return (
    <div className='app'>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
