import { Pokemon } from './IPokemon';
import { PokemonApiResponse } from './IPokemonAPI';

export interface State {
  data: Pokemon[] | null;
  loading: boolean;
  error: string | null | Error;
  searchData: string;
  pokemonData: PokemonApiResponse;
  searchHistory?: string[];
  hasError?: boolean;
  showSearchComponent?: boolean;
}
