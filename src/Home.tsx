import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

export default function Home() {
  const picture = useSelector((state: RootState) => state.formData.picture);

  return (
    <>
      <div className="flex flex-col gap-4 text-cyan-800 w-96 mx-auto">
        <Link to="/uncontrolled-form">Uncontrolled Form</Link>
        <Link to="/react-hook-form">React Hook Form</Link>
        <div className="">
          {picture && <img src={picture} alt="image"></img>}
        </div>
      </div>
    </>
  );
}
