import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import DetailsPageComponent from './DetailsPage';

const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/details/:detailId" element={<DetailsPageComponent />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
