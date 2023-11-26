import { http, HttpResponse } from 'msw';
import { pokemonMock } from '../../test/mocks/pokemonMock';
import { pokemonDetailsMock } from '../../test/mocks/pokemonDetailsMock';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10', async () => {
    const pokemonList: (typeof pokemonMock)[] = [
      {
        name: 'bulbasaur',
        img: 'bulbasaur-image-url',
      },
      {
        name: 'ivysaur',
        img: 'ivysaur-image-url',
      },
      {
        name: 'venusaur',
        img: 'venusaur-image-url',
      },
      {
        name: 'charmander',
        img: 'charmander-image-url',
      },
      {
        name: 'charmeleon',
        img: 'charmeleon-image-url',
      },
      {
        name: 'charizard',
        img: 'charizard-image-url',
      },
      {
        name: 'squirtle',
        img: 'squirtle-image-url',
      },
      {
        name: 'wartortle',
        img: 'wartortle-image-url',
      },
      {
        name: 'blastoise',
        img: 'blastoise-image-url',
      },
      {
        name: 'caterpie',
        img: 'caterpie-image-url',
      },
    ];

    return HttpResponse.json({ results: pokemonList });
  }),

  http.get('https://pokeapi.co/api/v2/pokemon/bulbasaur', async () => {
    const pokemon: typeof pokemonDetailsMock = {
      name: 'bulbasaur',
      img: 'bulbasaur-image-url',
      species: 'grass/poison',
      types: ['grass', 'poison'],
      stats: [
        { name: 'hp', base_stat: 45 },
        { name: 'attack', base_stat: 49 },
        { name: 'defense', base_stat: 49 },
        { name: 'special-attack', base_stat: 65 },
        { name: 'special-defense', base_stat: 65 },
        { name: 'speed', base_stat: 45 },
      ],
    };

    return HttpResponse.json(pokemon);
  }),
];
