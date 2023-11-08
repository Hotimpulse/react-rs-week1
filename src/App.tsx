import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import DetailsPage from './routes/DetailsPage';
import ErrorPage from './routes/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppRoutes />,
    children: [
      {
        path: '/details/:detailId',
        element: <DetailsPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: '/error',
    element: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
