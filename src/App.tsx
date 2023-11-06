import { Routes, Route } from 'react-router-dom';
import './App.css';
import PokemonComponent from './components/PokemonComponent';
import DetailsPage from './routes/DetailsPage';
function App() {
  return (
    <Routes>
      <Route path="/" element={<PokemonComponent />} />
      <Route path="/details">
        <Route path=":detailId" element={<DetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
