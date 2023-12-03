import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import './App.css';
import ReactHookForm from './ReactHookForm';
import UncontrolledForm from './UncontrolledForm';
import Home from './Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="home" />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/uncontrolled-form',
    element: <UncontrolledForm />,
  },
  {
    path: '/react-hook-form',
    element: <ReactHookForm />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
