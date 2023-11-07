import { PokemonClient } from 'pokenode-ts';
import { IPokemonList } from '../interfaces/IPokemonList';

interface IApi {
  getPokemonList: (page: number, limit: number) => Promise<IPokemonList[]>;
  client: PokemonClient;
  getPokemonByName: (name: string) => Promise<IPokemonList>;
  getPokemonData: (
    name: string,
    page: number,
    limit: number
  ) => Promise<IPokemonList[]>;
}

export class Api implements IApi {
  client = new PokemonClient();

  getPokemonList = async (page: number, limit: number) => {
    const response = await this.client.listPokemons(page, limit);

    const promises: Promise<IPokemonList>[] = response.results.map(
      async (element) => {
        const pokemon = await this.getPokemonByName(element.name);
        return pokemon;
      }
    );

    return Promise.all(promises);
  };

  getPokemonByName = async (name: string) => {
    const response = await this.client
      .getPokemonByName(name.toLowerCase())
      .then((data) => data);

    return {
      name: response.name,
      img: response.sprites.front_default,
      species: response.species.name,
      types: response.types.map((type) => type.type.name),
      stats: response.stats.map((stat) => ({
        name: stat.stat.name,
        base_stat: stat.base_stat,
      })),
    };
  };

  getPokemonData = async (name: string, page: number, limit: number) => {
    if (name) {
      const data = await this.getPokemonByName(name);
      return [data];
    } else {
      return await this.getPokemonList(page, limit);
    }
  };
}
