import { useNavigate, useRouteError } from 'react-router-dom';
import MyButton from '../components/ButtonComponent';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="space-y-5 flex flex-col gap-5">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <MyButton
        label={'Go back'}
        onClick={() => {
          navigate('/');
        }}
      />
    </div>
  );
}
