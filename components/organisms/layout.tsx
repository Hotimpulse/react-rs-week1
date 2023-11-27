import { ReactNode } from 'react';
import Navbar from '../molecules/Navbar';
import PokemonComponent from './PokemonComponent';
import { useRouter } from 'next/router';
import NotFound from '@/pages/_error';

interface LayOutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayOutProps) {
  const router = useRouter();

  if (router.pathname === '/error' || router.pathname === '/_error') {
    return (
      <div>
        <NotFound />
      </div>
    );
  }
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
