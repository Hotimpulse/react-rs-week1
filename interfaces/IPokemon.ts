export interface IPokemon {
  name: string | null;
  img: string | null;
  species: string;
  types: string[];
  stats: {
    name: string;
    base_stat: string | number;
  }[];
  sprites?: {
    front_default?: string;
  };
}
