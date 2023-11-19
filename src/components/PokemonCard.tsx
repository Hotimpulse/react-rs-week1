import { Link } from 'react-router-dom';
import { IPokemonList } from '../interfaces/IPokemonList';

interface IPokemonCardProps {
  pokemon: IPokemonList;
}

export default function PokemonCard({ pokemon }: IPokemonCardProps) {
  return (
    <li key={pokemon.name}>
      <Link to={`/details/${pokemon.name}`}>
        <img
          className="md:w-24"
          src={pokemon.img || ''}
          alt={pokemon.name || ''}
        />
        <span>{pokemon.name}</span>
      </Link>
    </li>
  );
}
