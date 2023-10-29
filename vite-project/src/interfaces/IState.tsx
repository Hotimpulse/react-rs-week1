import { Pokemon } from './IPokemon';

export interface State {
  data: Pokemon | null;
  loading: boolean;
  error: string | null;
  searchData: string;
  pokemonData: Pokemon;
  searchHistory: Pokemon[];
}
