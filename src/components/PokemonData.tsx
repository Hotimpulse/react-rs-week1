import { PokemonApiResponse } from '../interfaces/ISearchResults';
import LoaderSpinner from './LoaderSpinner';
import MyButton from './ButtonComponent';
import { PokemonComponent } from './PokemonComponent';
import { PokemonDataState } from '../interfaces/IPokemonDataState';
export interface PokemonDataProps {
  pokemonName?: string;
  onData?: (data: PokemonApiResponse) => void;
  onError?: (error: string) => void;
  onGoBack?: () => void;
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
      searchData: '',
      pokemonData: {
        name: '',
        species: {
          name: '',
        },
        img: '',
        types: [],
        stats: [
          {
            base_stat: '',
            stat: {
              name: '',
            },
          },
        ],
        sprites: {
          front_default: '',
        },
      },
      showSearchComponent: false,
    };
  }

  static async fetchPokemonData(
    pokemonName: string
  ): Promise<PokemonApiResponse> {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('This Pokemon does not exist, try another one!');
        } else {
          throw new Error(`HTTP request failed! Status: ${response.status}`);
        }
      }

      const data: PokemonApiResponse = await response.json();

      return data;
    } catch (error) {
      throw new Error('Error fetching data from the server');
    }
  }

  async componentDidMount() {
    try {
      const { pokemonName } = this.props;
      if (pokemonName) {
        this.loadPokemonDetails(pokemonName);
      }
    } catch (error) {
      this.setState({
        data: null,
        loading: false,
        error: 'Error fetching data from the server',
      });
    }
  }

  async componentDidUpdate(prevProps: PokemonDataProps) {
    const { pokemonName } = this.props;
    if (pokemonName && pokemonName !== prevProps.pokemonName) {
      this.loadPokemonDetails(pokemonName);
    }
  }

  private async loadPokemonDetails(pokemonName: string) {
    try {
      const pokemonData = await PokemonData.fetchPokemonData(pokemonName);
      this.setState({ pokemonData }, () => {
        this.setState({ loading: false });
      });
    } catch (error) {
      this.setState({
        data: null,
        loading: false,
        error: 'Error fetching Pokemon details from the server',
      });
    }
  }

  handleGoBack = () => {
    this.setState({
      showSearchComponent: true,
    });
  };

  render() {
    const { loading, error, pokemonData, showSearchComponent } = this.state;

    if (showSearchComponent) {
      return <PokemonComponent />;
    }

    return (
      <>
        {!error && !loading ? (
          <div className="bg-[#40f083] text-3xl font-bold underline flex-auto h-auto p-12 space-y-5 rounded">
            <div className="flex flex-col gap-10 h-full items-center">
              {pokemonData ? (
                <div>
                  <div className="flex flex-col gap-10 h-full items-center">
                    <h2>Pokemon Details:</h2>
                    <p>
                      Name:{' '}
                      {pokemonData?.name &&
                        `${pokemonData?.name
                          ?.charAt(0)
                          .toUpperCase()}${pokemonData?.name.slice(1)}`}
                    </p>
                    <p>Species: {pokemonData?.species?.name}</p>
                    {pokemonData?.sprites?.front_default && (
                      <img
                        className="w-48"
                        src={pokemonData?.sprites?.front_default}
                        alt="Pokemon image"
                      />
                    )}
                    <p>Type: {pokemonData.types?.[0]?.type?.name}</p>
                    <p>Stats:</p>
                    <ul>
                      {pokemonData?.stats?.map?.((stat, index) => (
                        <li
                          key={index}
                        >{`${stat?.stat?.name}: ${stat?.base_stat}`}</li>
                      ))}
                    </ul>
                    <MyButton label={'Go back'} onClick={this.handleGoBack} />
                  </div>
                </div>
              ) : (
                <>
                  {loading && <LoaderSpinner />}
                  {error ? (
                    <div className="text-red-500 p-2">
                      {error === 'Not Found' ? (
                        <div>
                          <p>This is not the right Pokemon name</p>
                          <MyButton
                            label={'Go back'}
                            onClick={this.handleGoBack}
                          />
                        </div>
                      ) : (
                        <>
                          <h2>Something went wrong</h2>
                          {error && <p>{error.toString()}</p>}
                          <MyButton
                            label={'Go back'}
                            onClick={this.handleGoBack}
                          />
                        </>
                      )}
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>
        ) : null}
      </>
    );
  }
}
