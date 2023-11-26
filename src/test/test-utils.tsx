import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { store } from '../store/store';
import pokemonReducer from './../store/pokemonSlice';
import { PokemonState } from './../store/pokemonSlice';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: unknown;
  store?: EnhancedStore;
}

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  const { preloadedState, store, ...renderOptions } = options || {};
  const storeInstance =
    store ||
    configureStore({
      reducer: pokemonReducer,
      preloadedState: preloadedState as PokemonState,
    });
  return render(ui, {
    wrapper: AllTheProviders,
    ...renderOptions,
  });
};

export * from '@testing-library/react';
export { customRender as render };
