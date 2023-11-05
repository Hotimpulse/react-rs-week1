import { PokemonApiResponse } from './ISearchResults';

export interface PokemonDataState {
  data: PokemonApiResponse | null;
  loading: boolean;
  error: string | null;
  searchData: string;
  pokemonData: {
    name: string;
    species: {
      name: string;
    };
    img: string;
    types: {
      type: {
        name: string;
      };
    }[];
    stats: {
      base_stat?: string;
      stat?: {
        name?: string;
      };
    }[];
    sprites: {
      front_default: string;
    };
  };
  showSearchComponent: boolean;
}
