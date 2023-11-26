// import { useNavigate, useRouteError } from 'react-router-dom';
import MyButton from '../components/atoms/ButtonComponent';
import Navbar from '../components/molecules/Navbar';
import { useDispatch } from 'react-redux';
import { setSearchData } from '../store/pokemonSlice';

export default function Error() {
    //   const navigate = useNavigate();
    //   const error = useRouteError();
    const dispatch = useDispatch();

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
                        dispatch(setSearchData(''));
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
