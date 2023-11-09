import { createContext, useContext, useReducer, ReactNode } from 'react';

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
  | { type: 'SET_SEARCH_DATA'; payload: string };

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
    default:
      return state;
  }
}

type AppContextType = State & {
  dispatch: React.Dispatch<Action>;
};

const MyAppContext = createContext<AppContextType>({
  ...initialState,
  dispatch: () => {},
});

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  const [{ name, img, species, types, stats, sprites, searchData }, dispatch] =
    useReducer(reducer, initialState);
  return (
    <MyAppContext.Provider
      value={{
        name,
        img,
        species,
        types,
        stats,
        sprites,
        searchData,
        dispatch,
      }}
    >
      {children}
    </MyAppContext.Provider>
  );
}

export const useMyAppContext = () => useContext(MyAppContext);
