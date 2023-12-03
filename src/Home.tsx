import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex gap-4 text-cyan-800">
      <Link to="/uncontrolled-form">Uncontrolled Form</Link>
      <Link to="/react-hook-form">React Hook Form</Link>
    </div>
  );
}
