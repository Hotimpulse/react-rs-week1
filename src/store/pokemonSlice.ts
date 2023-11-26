import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPokemonList } from '../interfaces/IPokemonList';
import { IPokemon } from '../interfaces/IPokemon';
import { Pokemon, PokemonClient } from 'pokenode-ts';
import { RootState } from './store';

export interface PokemonState {
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
  loading: boolean;
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
  loading: false,
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.results = action.payload;
      })
      .addCase(fetchPokemonList.rejected, (state) => {
        state.results = [];
      })
      .addCase(fetchPokemonByName.fulfilled, (state, action) => {
        state.singleResult = action.payload;
      })
      .addCase(fetchPokemonByName.rejected, (state) => {
        state.singleResult = {
          name: '',
          img: '',
          species: '',
          types: [],
          stats: [],
        };
      });
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
  setLoading,
} = pokemonSlice.actions;

export const fetchPokemonList = createAsyncThunk<
  IPokemonList[],
  { page: number; limit: number }
>(
  'pokemon/fetchPokemonList',
  async ({ page, limit }: { page: number; limit: number }) => {
    const client = new PokemonClient();
    const response = await client.listPokemons(page, limit);
    const promises = response.results.map(async (element) => {
      const pokemon = await fetchPokemonByName(element.name);
      return pokemon;
    });

    const pokemonList = await Promise.all(promises);
    return pokemonList;
  }
);

export const fetchPokemonByName = createAsyncThunk<IPokemon, string>(
  'pokemon/fetchPokemonByName',
  async (name: string) => {
    const client = new PokemonClient();
    const response = await client.getPokemonByName(name.toLowerCase());
    return transformPokemonData(response);
  }
);

const transformPokemonData = (response: Pokemon): IPokemon => {
  return {
    name: response.name,
    img: response.sprites.front_default,
    species: response.species.name,
    types: response.types.map((type) => type.type.name),
    stats: response.stats.map((stat) => ({
      name: stat.stat.name,
      base_stat: stat.base_stat,
    })),
  };
};

export default pokemonSlice.reducer;

export const selectPokemon = (state: RootState) => state.pokemon;
export const selectResults = (state: RootState) => state.pokemon.results;
export const selectSingleResult = (state: RootState) =>
  state.pokemon.singleResult;
