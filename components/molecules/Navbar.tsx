import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="flex justify-center items-center bg-slate-900 rounded h-10 mb-5">
      <nav className="flex gap-5 text-white">
        <Link href="/">Main</Link>
        <Link href="/error">Error</Link>
      </nav>
    </div>
  );
}
