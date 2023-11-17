import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPokemonList } from '../interfaces/IPokemonList';
import { IPokemon } from '../interfaces/IPokemon';

interface PokemonState {
  name: string | null;
  img: string | null;
  species: string;
  types: string[];
  stats: {
    name: string;
    base_stat: string | number;
  }[];
  sprites: {
    front_default: string;
  };
  searchData: string;
  results: IPokemonList[];
  singleResult: IPokemon | null;
}

const initialState: PokemonState = {
  name: '',
  img: '',
  species: '',
  types: [],
  stats: [],
  sprites: {
    front_default: '',
  },
  searchData: '',
  results: [],
  singleResult: null,
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setImg: (state, action: PayloadAction<string>) => {
      state.img = action.payload;
    },
    setSpecies: (state, action: PayloadAction<string>) => {
      state.species = action.payload;
    },
    setTypes: (state, action: PayloadAction<string[]>) => {
      state.types = action.payload;
    },
    setStats: (
      state,
      action: PayloadAction<{ name: string; base_stat: string | number }[]>
    ) => {
      state.stats = action.payload;
    },
    setSprites: (state, action: PayloadAction<{ front_default: string }>) => {
      state.sprites = action.payload;
    },
    setSearchData: (state, action: PayloadAction<string>) => {
      localStorage.setItem('searchData', action.payload);
      state.searchData = action.payload;
    },
    setPokeList: (state, action: PayloadAction<IPokemonList[]>) => {
      state.results = action.payload;
    },
    setSinglePokemon: (state, action: PayloadAction<IPokemon | null>) => {
      state.singleResult = action.payload;
    },
  },
});

export const {
  setName,
  setImg,
  setSpecies,
  setTypes,
  setStats,
  setSprites,
  setSearchData,
  setPokeList,
  setSinglePokemon,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
