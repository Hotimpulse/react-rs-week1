import MyButton from '../components/ButtonComponent';
import LoaderSpinner from '../components/LoaderSpinner';
import { IPokemon } from '../interfaces/IPokemon';
import { IPokemonList } from '../interfaces/IPokemonList';

interface IDetailsPageProps {
  loading?: boolean;
  error?: string | null;
  pokemonData?: IPokemon;
  pokemonListData?: IPokemonList;
  onClose?: () => void;
}

export default function DetailsPage({
  loading,
  error,
  pokemonData,
  onClose,
}: IDetailsPageProps) {
  const handleGoBack = () => {
    onClose;
  };
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
                  <MyButton label={'Go back'} onClick={handleGoBack} />
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
                        <MyButton label={'Go back'} onClick={handleGoBack} />
                      </div>
                    ) : (
                      <>
                        <h2>Something went wrong</h2>
                        {error && <p>{error.toString()}</p>}
                        <MyButton label={'Go back'} onClick={handleGoBack} />
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
