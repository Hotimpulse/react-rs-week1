import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DetailsPage from '../pages/DetailsPage';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from '../app/AppContext';
import { expect, vi } from 'vitest';
import { pokemonDetailsMock } from './mocks/pokemonDetailsMock';
import React from 'react';

describe('details page', async () => {
  it('should check that a loading indicator is displayed while fetching data', async () => {
    render(
      <AppProvider>
        <BrowserRouter>
          <DetailsPage />
        </BrowserRouter>
      </AppProvider>
    );

    expect(screen.getByTestId('loader-spinner')).toBeTruthy();
  });

  it('should display detailed card data correctly', async () => {
    const useEffectSpy = vi.spyOn(React, 'useEffect');

    const fetchDataMock = vi.spyOn(DetailsPage.prototype, 'fetchData');
    fetchDataMock.mockResolvedValueOnce(pokemonDetailsMock);

    render(
      <AppProvider>
        <BrowserRouter>
          <DetailsPage />
        </BrowserRouter>
      </AppProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loader-spinner')).toBeNull();
      expect(screen.getByText('Pokemon Details:')).toBeTruthy();
      expect(screen.getByAltText('pikachu')).toBeTruthy();
      expect(screen.getByText('Name: Pikachu')).toBeTruthy();
    });

    expect(fetchDataMock).toHaveBeenCalledTimes(1);

    expect(useEffectSpy).toHaveBeenCalledTimes(1);
    useEffectSpy.mockRestore();
  });

  it('should hide the component when one clicks the close button', async () => {
    render(
      <AppProvider>
        <BrowserRouter>
          <DetailsPage />
        </BrowserRouter>
      </AppProvider>
    );

    expect(screen.getByText('Details:')).toBeTruthy();

    fireEvent.click(screen.getByText('Close'));

    await waitFor(() => {
      expect(screen.queryByText('Details:')).toBeNull();
    });
  });
});
