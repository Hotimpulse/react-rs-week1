import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="flex justify-center items-center bg-slate-900 rounded h-10 mb-5">
      <nav className="flex gap-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `no-underline
      ${isActive ? 'text-white border-b-2 border-b-green-400' : 'text-purple'}`
          }
        >
          Main
        </NavLink>
        <NavLink
          to="/error"
          className={({ isActive }) =>
            `no-underline
      ${isActive ? 'text-white border-b-2 border-b-green-400' : 'text-purple'}`
          }
        >
          Error
        </NavLink>
      </nav>
    </div>
  );
}
