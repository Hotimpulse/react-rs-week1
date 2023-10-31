import React from 'react';
import { State } from './../interfaces/IState';
import { PokemonApiResponse } from '../interfaces/IPokemonAPI';
// components
import { SearchComponent } from './SearchComponent';
import { PokemonData } from './PokemonData';
import { ErrorBoundary } from './ErrorComponent';
import { PokemonDataProps } from '../components/PokemonData';
import { LoaderSpinner } from './LoaderSpinner';
export class PokemonComponent extends React.Component<PokemonDataProps, State> {
  state: State = {
    data: null,
    loading: true,
    error: null,
    searchData: '',
    pokemonData: {
      name: '',
      species: {
        name: '',
      },
      img: '',
      types: [
        {
          type: {
            name: '',
          },
        },
      ],
      stats: [
        {
          base_stat: '',
        },
      ],
      sprites: {
        front_default: '',
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

  handleData = (pokemonData: PokemonApiResponse) => {
    this.setState({ pokemonData, error: null, loading: false });
  };

  handleError = (error: string) => {
    this.setState({ data: null, error, loading: false });
  };

  async componentDidMount() {
    try {
      this.setState({
        data: null,
        loading: true,
        error: null,
      });
    } catch (error) {
      this.setState({
        data: null,
        loading: false,
        error: 'Error fetching data from the server',
      });
    } finally {
      setTimeout(() => {
        this.setState({
          data: null,
          loading: false,
          error: null,
        });
      }, 500);
    }
  }

  render() {
    const { searchData, loading } = this.state;
    return (
      <ErrorBoundary>
        <>
          {loading && <LoaderSpinner />}
          <SearchComponent
            onSearch={this.handleSearch}
            searchData={searchData}
            onData={this.handleData}
            onError={this.handleError}
          />
          <PokemonData
            pokemonName={searchData}
            onData={this.handleData}
            onError={this.handleError}
          />
        </>
      </ErrorBoundary>
    );
  }
}
