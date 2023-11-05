import { useEffect, useState } from 'react';
import {
  useNavigate,
  useLocation,
  NavLink,
  useParams,
  Outlet,
} from 'react-router-dom';
// components and interfaces
import { ErrorBoundary } from './ErrorComponent';
import LoaderSpinner from './LoaderSpinner';
import { Api } from '../api/Api';
import SearchComponent from './SearchComponent';
import { IPokemonList } from '../interfaces/IPokemonList';
import PokemonList from './PokemonList';
import PaginationComponent from './PaginationComponent';
import DetailsPage from '../routes/DetailsPage';

export default function PokemonComponent() {
  const api = new Api();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<string>(
    localStorage.getItem('searchData') || ''
  );
  const [results, setResults] = useState<IPokemonList[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { detailId } = useParams();

  const itemsPerPage = limit;
  const totalItems = results.length;
  console.log(results);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = results.slice(startIndex, endIndex);

  const handleSubmit = async (data: string, page = 1, limit = 10) => {
    setLoading(true);

    const response = await api.getPokemonData(data, page, limit);

    setResults(response);

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

    handleSubmit(searchData, page, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    navigate(`?page=${newPage}&limit=${limit}`);
  };

  const changeLimit = (newLimit: number) => {
    setLimit(newLimit);
    setPage(newLimit / limit);
    navigate(`?page=${page}&limit=${newLimit}`);
  };

  const handlePokeClick = (name: string) => {
    console.log('Clicked Pokemon:', name);
    setDetailsOpen(true);
    navigate(`/details/${name}`);
  };

  const closeDetailsSection = () => {
    setDetailsOpen(false);
    navigate('/');
  };

  // useEffect(() => {}, [page]); // changes searchParams, initial state

  return (
    <ErrorBoundary>
      <>
        <nav>
          <NavLink to="/">Main</NavLink>
          {detailsOpen && <NavLink to="/details">Details</NavLink>}
        </nav>

        <SearchComponent
          onSubmit={handleSubmit}
          searchData={searchData}
          setSearchData={setSearchData}
        />

        <div>
          <label htmlFor="limit">Items per page:</label>
          <select
            className="text-black"
            name="limit"
            id="limit"
            value={limit}
            onChange={(e) => changeLimit(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>

        {loading ? (
          <LoaderSpinner />
        ) : (
          <>
            <PokemonList list={displayedItems} onClick={handlePokeClick} />
            <PaginationComponent
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <Outlet />
          </>
        )}
        {detailsOpen && (
          <DetailsPage
            loading={false}
            error={null}
            pokemonListData={results.find(
              (pokemon) => pokemon.name === detailId
            )}
            onClose={closeDetailsSection}
          />
        )}
      </>
    </ErrorBoundary>
  );
}
