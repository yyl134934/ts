import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import Error from './pages/Error';
import router from './routes';
import './app.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});
const routes = createBrowserRouter(router);
function App() {
  return (
    <div className='app'>
      <ErrorBoundary fallbackRender={Error}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routes} />
        </QueryClientProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
