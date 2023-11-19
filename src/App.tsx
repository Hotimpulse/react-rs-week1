import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import DetailsPage from './pages/DetailsPage';
import ErrorPage from './pages/ErrorPage';
import Layout from './pages/Layout';
import LoaderSpinner from './components/LoaderSpinner';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        path: '/details/:detailId',
        element: <DetailsPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} fallbackElement={<LoaderSpinner />} />
    </>
  );
}

export default App;
