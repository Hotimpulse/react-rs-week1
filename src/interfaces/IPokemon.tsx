export interface Pokemon {
  name?: string;
  species?: {
    name: string;
  };
  img?: string;
  types?: {
    type: {
      name: string;
    };
  }[];
  stats?: {
    base_stat?: string;
  }[];
}
