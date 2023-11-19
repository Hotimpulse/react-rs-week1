import { IPokemonList } from '../interfaces/IPokemonList';
import PokemonCard from './PokemonCard';

interface IPokemonListProps {
  list: IPokemonList[];
}

export default function PokemonList({ list }: IPokemonListProps) {
  return (
    <div className="bg-[#55c6da] grid p-6 w-full rounded items-center justify-center">
      {list.length ? (
        <ul className="grid md:grid-cols-7 sm:grid-cols-4 md:gap-8 sm:gap-2 items-center justify-center">
          {list.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </ul>
      ) : (
        <div data-testid="nodata" className="text-red-500">
          No data
        </div>
      )}
    </div>
  );
}
