import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// components and interfaces
import { useApi } from '../api/Api';
import LoaderSpinner from './LoaderSpinner';
import PokemonList from './PokemonList';
import SearchComponent from './SearchComponent';
import { ErrorBoundary } from './ErrorComponent';
import PaginationComponent from './PaginationComponent';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setPokeList, setSearchData } from '../store/pokemonSlice';
import { setLoading } from '../store/pokemonSlice';

export default function PokemonComponent() {
  const api = useApi();
  const { searchData, results, loading } = useSelector(
    (state: RootState) => state.pokemon
  );
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const [limit, setLimit] = useState<number>(
    Number(searchParams.get('limit')) || 10
  );

  const handleSubmit = async (data: string, page: number, limit: number) => {
    try {
      dispatch(setLoading(true));

      setSearchParams({ page: `${page}`, limit: `${limit}` });

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
    setSearchParams({ page: `${page}`, limit: `${newLimit}` });
  };

  return (
    <>
      <ErrorBoundary>
        <Navbar />
        <SearchComponent
          onSubmit={(data) => {
            dispatch(setSearchData(data));
            handleSubmit(data, 1, limit);
          }}
        />
        {loading && <LoaderSpinner data-testid="loader-spinner" />}
        {!loading && <PokemonList />}
        {results.length > 0 && (
          <div>
            <PaginationComponent
              currentPage={page}
              currentLimit={limit}
              onPageChange={setPage}
            />
            <div>
              <span>Show:</span>
              <button onClick={() => changeLimit(10)}>10</button>
              <button onClick={() => changeLimit(20)}>20</button>
              <button onClick={() => changeLimit(50)}>50</button>
            </div>
          </div>
        )}
      </ErrorBoundary>
    </>
  );
}
