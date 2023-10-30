export interface Pokemon {
  name: string;
  species: string;
  img: string;
  type: string;
  stats: {
    hp: string;
    attack: string;
    defense: string;
  };
}
