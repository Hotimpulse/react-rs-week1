// hooks
import { useEffect, useState } from 'react';
import { useApi } from '../../api/Api';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
// components and interfaces
import PokemonList from './PokemonList';
import LoaderSpinner from '../atoms/LoaderSpinner';
import SearchComponent from '../molecules/SearchComponent';
import { ErrorBoundary } from '../molecules/ErrorComponent';
import PaginationComponent from './PaginationComponent';
// redux store
import { RootState } from '../../store/store';
import { setPokeList, setSearchData } from '../../store/pokemonSlice';
import { setLoading } from '../../store/pokemonSlice';
import MyButton from '../atoms/ButtonComponent';

export default function PokemonComponent() {
  const api = useApi();
  const router = useRouter();

  const { searchData, results, loading } = useSelector(
    (state: RootState) => state.pokemon
  );

  const dispatch = useDispatch();

  const { page: queryPage, limit: queryLimit } = router.query;

  const [page, setPage] = useState<number>(
    Number(queryPage) || 1
  );
  const [limit, setLimit] = useState<number>(
    Number(queryLimit) || 10
  );

  const handleSubmit = async (data: string, page: number, limit: number) => {
    try {
      dispatch(setLoading(true));

      const newSearchParams = new URLSearchParams();
      newSearchParams.append('page', page.toString());
      newSearchParams.append('limit', limit.toString());

      router.push({
        pathname: router.pathname,
        query: { ...router.query, ...Object.fromEntries(newSearchParams) },
      })

      const offset = (page - 1) * limit;
      const response = await api.getPokemonData(data, offset, limit);

      dispatch(setPokeList(response));
      setPage(page);
      setLimit(limit);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleSubmit(searchData, page, limit);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  const changeLimit = (newLimit: number) => {
    setPage(1);
    setLimit(newLimit);

    const newSearchParams = new URLSearchParams();
    newSearchParams.append('page', '1');
    newSearchParams.append('limit', newLimit.toString());

    router.push({
      pathname: router.pathname,
      query: { ...router.query, ...Object.fromEntries(newSearchParams) },
    });
  };

  return (
    <>
      <ErrorBoundary>
        <SearchComponent
          onSubmit={(data) => {
            dispatch(setSearchData(data));
            handleSubmit(data, 1, limit);
          }}
        />
        {loading && <LoaderSpinner data-testid="loader-spinner" />}
        {!loading && <PokemonList />}
        {results.length > 0 && (
          <div className='flex flex-col gap-5 justify-center items-center'>
            <PaginationComponent
              currentPage={page}
              currentLimit={limit}
              onPageChange={setPage}
            />
            <div className='flex gap-5 justify-center align-middle items-baseline'>
              <span>Show:</span>
              <MyButton onClick={() => changeLimit(10)} label="10"/>
              <MyButton onClick={() => changeLimit(20)} label="20"/>
              <MyButton onClick={() => changeLimit(50)} label="50"/>
            </div>
          </div>
        )}
      </ErrorBoundary>
    </>
  );
}
