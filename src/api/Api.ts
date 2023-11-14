import { PokemonClient } from 'pokenode-ts';
import { IPokemonList } from '../interfaces/IPokemonList';
import { useState } from 'react';
import { useMyAppContext } from '../app/AppContext';
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
  const { dispatch } = useMyAppContext();

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
      dispatch({ type: 'SET_POKELIST', payload: pokemonList });
      return pokemonList;
    } catch (error) {
      dispatch({ type: 'SET_POKELIST', payload: [] });
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

      dispatch({ type: 'SET_SINGLE_POKEMON', payload: pokemonData });
      return pokemonData;
    } catch (error) {
      console.log('API Error:', error);
      dispatch({
        type: 'SET_SINGLE_POKEMON',
        payload: { name: '', img: '', species: '', types: [], stats: [] },
      });
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
