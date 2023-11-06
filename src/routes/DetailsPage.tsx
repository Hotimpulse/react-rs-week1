import { useEffect, useState } from 'react';
import { Api } from '../api/Api';
import MyButton from '../components/ButtonComponent';
import LoaderSpinner from '../components/LoaderSpinner';
import { IPokemonList } from '../interfaces/IPokemonList';
import { useNavigate, useParams } from 'react-router-dom';

export default function DetailsPage() {
  const { detailId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pokemonData, setPokemonData] = useState<IPokemonList | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (name: string) => {
      const api = new Api();
      try {
        const data = await api.getPokemonByName(name);
        console.log(data, `data`);
        setPokemonData(data);
        setLoading(false);
      } catch (error) {
        setError('Something went wrong!');
        setLoading(false);
      }
    };

    if (detailId) {
      fetchData(detailId);
    }
  }, [detailId]);

  const closeDetailsSection = () => {
    navigate('/');
  };

  return (
    <>
      {loading && <LoaderSpinner />}
      {!error && !loading ? (
        <div className="bg-[#40f083] text-3xl font-bold underline flex-auto h-auto p-12 space-y-5 rounded">
          <div className="flex flex-col gap-10 h-full items-center">
            {pokemonData ? (
              <div>
                <div className="flex flex-col gap-10 h-full items-center">
                  <h2>Pokemon Details:</h2>
                  <img
                    className="w-48"
                    src={pokemonData.img || ''}
                    alt={pokemonData.name}
                  />
                  <p>
                    Name:{' '}
                    {pokemonData?.name &&
                      `${pokemonData?.name
                        ?.charAt(0)
                        .toUpperCase()}${pokemonData?.name.slice(1)}`}
                  </p>
                  <p>Type: {pokemonData.types?.[0]}</p>
                  <p>Stats:</p>
                  <ul>
                    {pokemonData?.stats?.map?.(
                      (stat: string, index: number) => (
                        <li
                          key={index}
                        >{`${stat?.name}: ${stat?.base_stat}`}</li>
                      )
                    )}
                  </ul>
                  <MyButton label={'Close'} onClick={closeDetailsSection} />
                </div>
              </div>
            ) : (
              <>
                {error ? (
                  <div className="text-red-500 p-2">
                    {error === 'Not Found' ? (
                      <div>
                        <p>This is not the right Pokemon name</p>
                        <MyButton
                          label={'Go back'}
                          onClick={closeDetailsSection}
                        />
                      </div>
                    ) : (
                      <>
                        <h2>Something went wrong</h2>
                        {error && <p>{error.toString()}</p>}
                        <MyButton
                          label={'Go back'}
                          onClick={closeDetailsSection}
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
