import { PokemonApiResponse } from './ISearchResults';

export interface PokemonDataProps {
  pokemonName?: string;
  onData?: (data: PokemonApiResponse) => void;
  onError?: (error: string) => void;
  onGoBack?: () => void;
}
