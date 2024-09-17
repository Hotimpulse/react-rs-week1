import { IPokemon } from './IPokemon';

export interface IPokemonList extends IPokemon {
  name: string | null;
  img: string | null;
}
