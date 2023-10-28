import React, { FormEvent } from 'react';
import { MyButton } from './ButtonComponent';

interface Pokemon {
  name: string;
}

interface State {
  data: Pokemon | null;
  loading: boolean;
  error: string | null;
  searchData: string;
}

export class PokemonComponent extends React.Component<{ name: string }, State> {
  state: State = {
    data: null,
    loading: true,
    error: null,
    searchData: '',
  };

  componentDidMount(): void {
    this.fetchPokemonData();
  }

  handleChange = (event: FormEvent<HTMLInputElement>) => {
    this.setState({ searchData: event.currentTarget.value });
  };

  handleSubmit = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.fetchPokemonData();
    localStorage.setItem('searchedPokemon', this.state.searchData);
  };

  fetchPokemonData = async () => {};

  render() {
    const { searchData } = this.state;
    return (
      <>
        <div className="bg-[#bada55] text-[22px] text-color-red h-96 flex-auto p-12 ">
          <div className="flex-auto">
            <span className="mr-5 flex">Search for a Pokemon:</span>
            <form onSubmit={this.handleSubmit as React.FormEventHandler}>
              <input
                className="border 1px red flex-auto mr-5 text-blue-600"
                type="text"
                name="search"
                placeholder="Search for a Pokemon's name (i.e. Pikachu)"
                value={searchData}
                onChange={this.handleChange}
              />
              <MyButton label="Search" type="submit" />
            </form>
          </div>
        </div>
      </>
    );
  }
}
