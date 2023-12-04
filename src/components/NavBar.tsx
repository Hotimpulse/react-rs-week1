import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className="flex w-96 bg-orange-200 justify-center mx-auto p-5">
      <Link to="/">Main</Link>
    </div>
  );
}
