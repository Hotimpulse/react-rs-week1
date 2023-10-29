import React, { FormEvent } from 'react';
import { MyButton } from '../components/ButtonComponent';
import { State } from './../interfaces/IState';
import { PokemonApiResponse } from '../interfaces/IPokemonAPI';

interface SearchComponentProps {
  onSearch: (pokemonName: string) => void;
  searchData: string;
  onData: (data: PokemonApiResponse) => void;
  onError: (error: string) => void;
}

export class SearchComponent extends React.Component<
  SearchComponentProps,
  State
> {
  state: State = {
    searchData: '',
    data: null,
    loading: false,
    error: null,
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
    searchHistory: [],
  };

  throwError = () => {
    throw new Error('You have an error!');
  };

  handleChange = (event: FormEvent<HTMLInputElement>) => {
    const pokemonName = event.currentTarget.value;
    this.props.onSearch(pokemonName.toLowerCase());
  };

  handleSubmit = async (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { searchData } = this.props;
    const pokemonName = searchData.toLowerCase();
    console.log(pokemonName);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      if (!response.ok) {
        throw new Error(`HTTP request failed! Status: ${response.status}`);
      }

      const searchHistory = JSON.parse(
        localStorage.getItem('searchHistory') || '[]'
      );
      const updatedSearchHistory = [...searchHistory, pokemonName];
      localStorage.setItem('searchTerm', JSON.stringify(updatedSearchHistory));

      const data: PokemonApiResponse = await response.json();
      this.props.onData(data);
    } catch (error) {
      this.props.onError('Error fetching data from the server');
    }
  };

  render() {
    const { searchData } = this.props;
    return (
      <div className="bg-[#bada55] text-[22px] text-color-red h-full flex-auto p-12 w-full rounded">
        <div className="flex-auto space-y-5 mb-10">
          <h2 className="mr-5 flex">Search for a Pokemon:</h2>
          <form
            className="space-y-5 flex flex-col"
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
            <MyButton label="Error" onClick={this.throwError} />
          </form>
        </div>
      </div>
    );
  }
}
