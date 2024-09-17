import { PokemonClient } from 'pokenode-ts';
import { IPokemonList } from '../interfaces/IPokemonList';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const getPokemonList = async (page: number, limit: number) => {
    try {
      const response = await client.listPokemons(page, limit);
      const promises: Promise<IPokemonList>[] = response.results.map(
        async (element) => {
          const pokemon = await getPokemonByName(element.name);
          return pokemon;
        }
      );

      return Promise.all(promises);
    } catch (error) {
      console.log('getPokemonList Error:', error);
      navigate('/error');
      throw new Error('Error in the API!');
    }
  };

  const getPokemonByName = async (name: string) => {
    try {
      const response = await client
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
    } catch (error) {
      console.log('API Error:', error);
      navigate('/error');
      throw new Error('Error in the API!');
    }
  };

  const getPokemonData = async (name: string, page: number, limit: number) => {
    try {
      if (name) {
        const data = await getPokemonByName(name);
        return [data];
      } else {
        return await getPokemonList(page, limit);
      }
    } catch (error) {
      console.log('getPokemonData Error:', error);
      navigate('/error');
      throw new Error('Error in the API!');
    }
  };

  return { getPokemonByName, client, getPokemonData, getPokemonList };
};
