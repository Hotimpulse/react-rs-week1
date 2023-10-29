import React from 'react';
import { State } from './../interfaces/IState';
import { PokemonApiResponse } from '../interfaces/IPokemonAPI';
// components
import { SearchComponent } from './SearchComponent';
import { PokemonData } from './PokemonData';
import { ErrorBoundary } from './ErrorComponent';
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

  handleSearch = (pokemonName: string) => {
    this.setState({
      searchData: pokemonName,
      loading: true,
      data: null,
      error: null,
    });
  };

  handleData = (data: PokemonApiResponse) => {
    this.setState({ data, loading: false });
  };

  handleError = (error: string) => {
    this.setState({ error, loading: false });
  };

  render() {
    const { data, error, searchData } = this.state;
    return (
      <ErrorBoundary>
        <>
          <SearchComponent
            onSearch={this.handleSearch}
            searchData={searchData}
            onData={this.handleData}
            onError={this.handleError}
          />
          {error ? (
            <div>
              <h2 className="text-red-800">{error}</h2>
              <p>Gotta catch them all! Choose a different Pokemon...</p>
            </div>
          ) : data ? (
            <PokemonData
              pokemonName={searchData}
              onData={this.handleData}
              onError={this.handleError}
            />
          ) : (
            <p>Use the search, don`t be shy!</p>
          )}
        </>
      </ErrorBoundary>
    );
  }
}
