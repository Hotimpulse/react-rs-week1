import { useEffect, useState } from 'react';
import MyButton from '../components/ButtonComponent';
import LoaderSpinner from '../components/LoaderSpinner';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonByName, setSinglePokemon } from '../store/pokemonSlice';
import { IPokemon } from '../interfaces/IPokemon';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { setLoading } from '../store/pokemonSlice';

export default function DetailsPage() {
  const { detailId } = useParams();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { singleResult, loading } = useSelector(
    (state: RootState) => state.pokemon
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchData = async (name: string) => {
      try {
        const action: AsyncThunkAction<IPokemon, string, RootState> = dispatch(
          fetchPokemonByName(name)
        );

        const data: IPokemon = await action.payload;

        dispatch(setSinglePokemon(data));
      } catch (error) {
        setError('Something went wrong!');
      }
    };
    const loadData = async () => {
      if (detailId) {
        await fetchData(detailId);
      } else {
        return;
      }
    };

    loadData().then(() => {
      dispatch(setLoading(false));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailId]);

  const closeDetailsSection = () => {
    navigate(-1);
  };

  return (
    <>
      {loading && <LoaderSpinner data-testid="loader-spinner" />}
      {!error && !loading ? (
        <div className="bg-[#40f083] md:text-3xl h-full md:p-12 max-w-md:p-4 space-y-5 font-bold rounded text-sm max-w-prose">
          {singleResult ? (
            <div className="flex flex-col md:gap-7 max-w-md:gap-4 items-center">
              <h2 className="mt-3">Pokemon Details:</h2>
              <img
                className="md:w-48"
                src={singleResult.img || ''}
                alt={singleResult.name || ''}
              />
              <p>
                Name:{' '}
                {singleResult?.name &&
                  `${singleResult?.name
                    ?.charAt(0)
                    .toUpperCase()}${singleResult?.name.slice(1)}`}
              </p>
              <p>Type: {singleResult.types?.[0]}</p>
              <p>Stats:</p>
              <ul className="mb-2">
                {singleResult.stats?.map?.((stat, index) => (
                  <li key={index}>{`${stat.name}: ${stat.base_stat}`}</li>
                ))}
              </ul>
              <MyButton label={'Close'} onClick={closeDetailsSection} />
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
      ) : null}
    </>
  );
}
