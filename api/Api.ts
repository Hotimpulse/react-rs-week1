import { PokemonClient } from 'pokenode-ts';
import { IPokemonList } from '../interfaces/IPokemonList';
import { useState } from 'react';
import { IPokemon } from '../interfaces/IPokemon';

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

export const useApi = (): IApi => {
  const [client] = useState(new PokemonClient());

  const getPokemonList = async (
    page: number,
    limit: number
  ): Promise<IPokemonList[]> => {
    try {
      const response = await client.listPokemons(page, limit);
      const promises: Promise<IPokemonList>[] = response.results.map(
        async (element) => {
          const pokemon = await getPokemonByName(element.name);
          return pokemon;
        }
      );

      const pokemonList = await Promise.all(promises);
      return pokemonList;
    } catch (error) {
      return [];
    }
  };

  const getPokemonByName = async (name: string) => {
    try {
      const response = await client
        .getPokemonByName(name.toLowerCase())
        .then((data) => data);

      const pokemonData: IPokemon = {
        name: response.name,
        img: response.sprites.front_default,
        species: response.species.name,
        types: response.types.map((type) => type.type.name),
        stats: response.stats.map((stat) => ({
          name: stat.stat.name,
          base_stat: stat.base_stat,
        })),
      };

      return pokemonData;
    } catch (error) {
      console.log('API Error:', error);
      return {
        name: '',
        img: '',
        species: '',
        types: [],
        stats: [],
      };
    }
  };

  const getPokemonData = async (
    name: string,
    page: number,
    limit: number
  ): Promise<IPokemonList[]> => {
    try {
      if (name) {
        const data = await getPokemonByName(name);
        if (!data.name) {
          return [];
        }
        return [data];
      } else {
        const pokemonList = await getPokemonList(page, limit);
        return pokemonList;
      }
    } catch (error) {
      return [];
    }
  };

  return { getPokemonByName, client, getPokemonData, getPokemonList };
};
