import Link from 'next/link';
import { IPokemonList } from '../../interfaces/IPokemonList';

interface IPokemonCardProps {
  pokemon: IPokemonList;
}

export default function PokemonCard({ pokemon }: IPokemonCardProps) {
  return (
    <li key={pokemon.name}>
      <Link href={`/details/${pokemon.name}`}>
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
