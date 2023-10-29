import React, { FormEvent } from 'react';
import { MyButton } from './ButtonComponent';
import { LoaderSpinner } from './LoaderSpinner';

interface Pokemon {
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
interface PokemonApiResponse {
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
    base_stat: string;
  }[];
}

interface State {
  data: Pokemon | null;
  loading: boolean;
  error: string | null;
  searchData: string;
  pokemonData: Pokemon;
}

export class PokemonComponent extends React.Component {
  state: State = {
    data: null,
    loading: true,
    error: null,
    searchData: '',
    pokemonData: {
      name: '',
      species: '',
      img: '',
      type: '',
      stats: {
        hp: '',
        attack: '',
        defense: '',
      },
    },
  };

  fetchPokemonData = async (): Promise<void> => {
    try {
      const pokemonName: string = this.state.searchData.toLowerCase() || '';
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

      this.setState({
        data: pokemonData,
        loading: false,
        error: null,
      });
    } catch (error) {
      this.setState({
        data: null,
        loading: false,
        error: 'Error fetching data from the server',
      });
    }
  };

  handleChange = (event: FormEvent<HTMLInputElement>) => {
    this.setState({ searchData: event.currentTarget.value });
  };

  handleSubmit = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.fetchPokemonData();
    localStorage.setItem('searchedPokemon', this.state.searchData);
  };

  throwError = () => {
    throw new Error('This is an error!');
  };

  render() {
    const { loading, error, data, searchData } = this.state;
    return (
      <>
        <div className="bg-[#bada55] text-[22px] text-color-red h-full flex-auto p-12 w-full rounded">
          <div className="flex-auto space-y-5 mb-10">
            <h2 className="mr-5 flex">Search for a Pokemon:</h2>
            <form
              className="space-y-5"
              onSubmit={this.handleSubmit as React.FormEventHandler}
            >
              <input
                className="border 1px red flex-auto mr-5 text-blue-600 w-full pl-2 rounded"
                type="text"
                name="search"
                placeholder="(i.e. Pikachu)"
                value={searchData}
                onChange={this.handleChange}
              />
              <MyButton label="Search" type="submit" />
            </form>
          </div>

          {data ? (
            <div className="bg-[#40f083] text-3xl font-bold underline flex-auto h-auto p-12 space-y-5 rounded">
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
              <MyButton label="Error" onClick={this.throwError} />
              {loading && <LoaderSpinner />}
              {error && (
                <div>
                  <h2 className="text-red-800">{error}</h2>
                </div>
              )}
            </div>
          ) : (
            <LoaderSpinner />
          )}
        </div>
      </>
    );
  }
}
