import MyButton from '../components/atoms/ButtonComponent';
import { useDispatch } from 'react-redux';
import { setSearchData } from '../store/pokemonSlice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';

interface NotFoundProps {
  statusCode?: number;
}

const NotFound: NextPage<NotFoundProps> = ({ statusCode }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const redirect = setTimeout(() => {
      dispatch(setSearchData(''));
      router.push('/');
    }, 2000);

    return () => clearTimeout(redirect);
  }, [router]);

  return (
    <>
      <div className="text-center space-y-5 flex flex-col gap-5">
        <h1 className="text-3xl">Oops!</h1>
        <p>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </p>
        <MyButton
          label={'Go back'}
          onClick={() => {
            dispatch(setSearchData(''));
            router.push('/');
          }}
        />
      </div>
    </>
  );
};

NotFound.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default NotFound;
