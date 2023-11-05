import { Routes, Route } from 'react-router-dom';
import './App.css';
import PokemonComponent from './components/PokemonComponent';
function App() {
  return (
    <Routes>
      <Route path="/" element={<PokemonComponent />} />
    </Routes>
  );
}

export default App;
