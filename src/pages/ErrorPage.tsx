import { useNavigate, useRouteError } from 'react-router-dom';
import MyButton from '../components/ButtonComponent';
import Navbar from '../components/Navbar';
import { useMyAppContext } from '../app/AppContext';

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();
  const { dispatch } = useMyAppContext();

  return (
    <>
      <Navbar />
      <div className="space-y-5 flex flex-col gap-5">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        {isError(error) && <p>{error.statusText}</p>}
        <MyButton
          label={'Go back'}
          onClick={() => {
            dispatch({ type: 'SET_SEARCH_DATA', payload: '' });
            navigate('/');
          }}
        />
      </div>
    </>
  );
}

function isError(error: unknown): error is { statusText: string } {
  return !!error && typeof error === 'object' && 'statusText' in error;
}
