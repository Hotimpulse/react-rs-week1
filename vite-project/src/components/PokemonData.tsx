import React from 'react';
import { Pokemon } from '../interfaces/IPokemon';
import { PokemonApiResponse } from '../interfaces/IPokemonAPI';
import { LoaderSpinner } from './LoaderSpinner';

interface PokemonDataProps {
  pokemonName: string;
  onData: (data: PokemonApiResponse) => void;
  onError: (error: string) => void;
}

interface PokemonDataState {
  data: Pokemon | null;
  loading: boolean;
  error: string | null;
}

export class PokemonData extends React.Component<
  PokemonDataProps,
  PokemonDataState
> {
  constructor(props: PokemonDataProps) {
    super(props);

    this.state = {
      data: null,
      loading: true,
      error: null,
    };
  }

  static async fetchPokemonData(pokemonName: string): Promise<Pokemon> {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );

      if (!response.ok) {
        throw new Error(`HTTP request failed! Status: ${response.status}`);
      }

      const data: PokemonApiResponse = await response.json();

      const pokemonData: Pokemon = {
        name: data.name || '',
        species: data.species.name || '',
        img: data.sprites.front_default || '',
        type: data.types[0]?.type.name || '',
        stats: {
          hp: data.stats[0]?.base_stat || '',
          attack: data.stats[1]?.base_stat || '',
          defense: data.stats[2]?.base_stat || '',
        },
      };

      return pokemonData;
    } catch (error) {
      throw new Error('Error fetching data from the server');
    }
  }

  async componentDidMount() {
    const { pokemonName } = this.props;

    try {
      const data = await PokemonData.fetchPokemonData(pokemonName);
      this.setState({
        data,
        loading: false,
        error: null,
      });
    } catch (error) {
      this.props.onError('Error fetching data from the server');
      this.setState({
        data: null,
        loading: false,
        error: 'Error fetching data from the server',
      });
    }
  }

  render() {
    const { data, loading, error } = this.state;
    return (
      <>
        {!error ? (
          <div className="bg-[#40f083] text-3xl font-bold underline flex-auto h-auto p-12 space-y-5 rounded">
            {loading && <LoaderSpinner />}
            <div className="flex flex-col gap-10 h-full items-center">
              <h2>Pokemon Details:</h2>
              <p>
                Name:{' '}
                {data?.name &&
                  `${data?.name?.charAt(0).toUpperCase()}${data?.name.slice(
                    1
                  )}`}
              </p>
              <p>Species: {data?.species}</p>
              {data?.img && (
                <img className="w-48" src={data?.img} alt="Pokemon image" />
              )}
              <p>Type: {data?.type}</p>
              <p>Stats:</p>
              <ul>
                <li>HP: {data?.stats.hp}</li>
                <li>Attack: {data?.stats.attack}</li>
                <li>Defense: {data?.stats.defense}</li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-red-800">{error?.toString()}</h2>
            <p>Gotta catch them all! Choose a different pokemon...</p>
          </div>
        )}
      </>
    );
  }
}
