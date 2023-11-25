import PokemonList from '../components/PokemonList';
import { render, screen } from './test-utils';
import { expect } from 'vitest';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { setupServer } from 'msw/node';
import { handlers } from './mocks/apiHandlers';
import '@testing-library/jest-dom';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('pokemonList', () => {
  it('the component should render the specified number of cards', () => {
    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    const listItems = screen.getByTestId('list');
    expect(listItems).toBeInTheDocument();
  });
  it('should check that an appropriate message is displayed if no cards are present', () => {
    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    expect(screen.getByTestId('nodata')).toHaveTextContent('No data');
  });
});
