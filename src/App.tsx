import './App.css';
import { PokemonComponent } from './components/PokemonComponent';
import { ErrorBoundary } from './components/ErrorComponent';
function App() {
  return (
    <ErrorBoundary>
      <PokemonComponent />
    </ErrorBoundary>
  );
}

export default App;
