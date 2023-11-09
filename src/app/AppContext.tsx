import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from 'react';
import { IPokemonList } from '../interfaces/IPokemonList';
import { IPokemon } from '../interfaces/IPokemon';

type State = {
  name: string | null;
  img: string | null;
  species: string;
  types: string[];
  stats: {
    name: string;
    base_stat: string | number;
  }[];
  sprites?: {
    front_default?: string;
  };
  searchData: string;
  results: IPokemonList[];
  singleResult: IPokemon | null;
};

const initialState = {
  name: '',
  img: '',
  species: '',
  types: [],
  stats: [],
  sprites: {
    front_default: '',
  },
  searchData: localStorage.getItem('searchData') as string,
  results: [],
  singleResult: null,
};

type Action =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_IMG'; payload: string }
  | { type: 'SET_SPECIES'; payload: string }
  | { type: 'SET_TYPES'; payload: string[] }
  | {
      type: 'SET_STATS';
      payload: { name: string; base_stat: string | number }[];
    }
  | { type: 'SET_SPRITES'; payload: { front_default?: string } }
  | { type: 'SET_SEARCH_DATA'; payload: string }
  | { type: 'SET_POKELIST'; payload: IPokemonList[] }
  | { type: 'SET_SINGLE_POKEMON'; payload: IPokemon };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_IMG':
      return { ...state, img: action.payload };
    case 'SET_SPECIES':
      return { ...state, species: action.payload };
    case 'SET_TYPES':
      return { ...state, types: action.payload };
    case 'SET_STATS':
      return { ...state, stats: action.payload };
    case 'SET_SPRITES':
      return { ...state, sprites: action.payload };
    case 'SET_SEARCH_DATA':
      localStorage.setItem('searchData', action.payload);
      return { ...state, searchData: action.payload };
    case 'SET_POKELIST':
      return { ...state, results: action.payload };
    case 'SET_SINGLE_POKEMON':
      return { ...state, singleResult: action.payload };
    default:
      return state;
  }
}

type AppContextType = State & {
  dispatch: Dispatch<Action>;
};

const MyAppContext = createContext<AppContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  const [
    {
      name,
      img,
      species,
      types,
      stats,
      sprites,
      searchData,
      results,
      singleResult,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const contextValue: AppContextType = {
    name,
    img,
    species,
    types,
    stats,
    sprites,
    searchData,
    results,
    singleResult,
    dispatch,
  };

  return (
    <MyAppContext.Provider value={contextValue}>
      {children}
    </MyAppContext.Provider>
  );
}

export const useMyAppContext = () => {
  const context = useContext(MyAppContext);
  if (!context) {
    throw new Error('useMyAppContext must be used within AppProvider');
  }
  return context;
};
