export interface PokemonApiResponse {
  name: string;
  species: {
    name: string;
  };
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: string;
  }[];
}
