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
    stat?: {
      name?: string;
    };
    base_stat?: string;
  }[];
  img: string;
}
