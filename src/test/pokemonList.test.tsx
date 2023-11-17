import { BrowserRouter } from 'react-router-dom';
import PokemonList from '../components/PokemonList';
import { IPokemonList } from '../interfaces/IPokemonList';
import { pokemonMock } from './mocks/pokemonMock';
import { render, screen, within } from '@testing-library/react';
import { expect } from 'vitest';

describe('pokemonList', () => {
  it('the component should render the specified number of cards', () => {
    const listArray: IPokemonList[] = Array(10)
      .fill(pokemonMock)
      .map((el, index) => ({ ...el, name: el.name + index }));
    render(<PokemonList list={listArray} />, { wrapper: BrowserRouter });

    const { getAllByRole } = within(screen.getByRole('list'));

    expect(getAllByRole('listitem').length).toBe(10);
  });
  it('should check that an appropriate message is displayed if no cards are present', () => {
    render(<PokemonList list={[]} />);

    expect(screen.getByTestId('nodata')).toHaveTextContent('No data');
  });
});
