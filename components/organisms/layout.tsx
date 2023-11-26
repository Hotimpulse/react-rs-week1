import { ReactNode } from 'react';
import Navbar from '../molecules/Navbar';
import PokemonComponent from './PokemonComponent';

interface LayOutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayOutProps) {
  return (
    <div className="flex">
      <div>
        <Navbar />
        <PokemonComponent />
      </div>
      <div>{children}</div>
    </div>
  );
}
