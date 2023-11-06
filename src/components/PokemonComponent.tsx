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
  const [limit, setLimit] = useState<number>(10);

  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSubmit = async (data: string, page: number, limit: number) => {
    setLoading(true);

    const offset = (page - 1) * limit;
    const response = await api.getPokemonData(data, offset, limit);

    setResults(response);
    setPage(page);
    setLimit(limit);

    setLoading(false);
  };

  useEffect(() => {
    handleSubmit(searchData, page, limit);
  }, [page, limit]);

  const changeLimit = (newLimit: number) => {
    setPage(1);
    setLimit(newLimit);
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
