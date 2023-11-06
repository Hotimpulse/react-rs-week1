import { useEffect, useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
// components and interfaces
import { ErrorBoundary } from './ErrorComponent';
import LoaderSpinner from './LoaderSpinner';
import { Api } from '../api/Api';
import SearchComponent from './SearchComponent';
import { IPokemonList } from '../interfaces/IPokemonList';
import PokemonList from './PokemonList';
import PaginationComponent from './PaginationComponent';

export default function PokemonComponent() {
  const api = new Api();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<string>(
    localStorage.getItem('searchData') || ''
  );
  const [results, setResults] = useState<IPokemonList[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(30);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (
    data: string,
    newPage: number,
    newLimit: number
  ) => {
    setLoading(true);

    const response = await api.getPokemonData(data, newPage, newLimit);

    setResults(response);
    setPage(newPage);
    setLimit(newLimit);

    setLoading(false);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageParam = parseInt(queryParams.get('page') || '1', 10);
    const limitParam = parseInt(queryParams.get('limit') || '10', 10);

    if (!isNaN(pageParam)) {
      setPage(pageParam);
    }

    if (!isNaN(limitParam)) {
      setLimit(limitParam);
    }

    handleSubmit(searchData, pageParam, limitParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handlePageChange = (newPage: number) => {
    navigate(`?page=${newPage}&limit=${limit}`);
  };

  const changeLimit = (newLimit: number) => {
    setPage(1);
    navigate(`?page=1&limit=${newLimit}`);
  };

  const handlePokeClick = (name: string) => {
    console.log('Clicked Pokemon:', name);
    navigate(`/details/${name}`);
  };

  return (
    <ErrorBoundary>
      <>
        <nav>
          <NavLink to="/">Main</NavLink>
        </nav>

        <SearchComponent
          onSubmit={(data) => handleSubmit(data, 1, limit)}
          searchData={searchData}
          setSearchData={setSearchData}
        />
        {loading && <LoaderSpinner />}
        {!loading && results.length > 0 && (
          <>
            <PokemonList list={results} onClick={handlePokeClick} />
            <PaginationComponent
              currentPage={page}
              totalPages={Math.ceil(results.length / limit)}
              onPageChange={handlePageChange}
            />
            <div>
              <span>Show:</span>
              <button onClick={() => changeLimit(10)}>10</button>
              <button onClick={() => changeLimit(20)}>20</button>
              <button onClick={() => changeLimit(50)}>50</button>
            </div>
          </>
        )}
      </>
    </ErrorBoundary>
  );
}
