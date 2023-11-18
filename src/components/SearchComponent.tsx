import { ChangeEvent, FormEvent } from 'react';
import MyButton from '../components/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setSearchData } from '../store/pokemonSlice';

interface ISearchComponentProps {
  onSubmit: (data: string) => void;
}

export default function SearchComponent({ onSubmit }: ISearchComponentProps) {
  const { searchData } = useSelector((state: RootState) => state.pokemon);
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchData = event.target.value;
    dispatch(setSearchData(newSearchData));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(searchData);
  };

  return (
    <>
      <form className="space-y-5 flex flex-col" onSubmit={handleSubmit}>
        <input
          className="border 1px red flex-auto mr-5 text-blue-600 w-full pl-2 rounded"
          type="text"
          name="search"
          placeholder="(i.e. Pikachu)"
          value={searchData}
          onChange={handleChange}
        />
        <MyButton label="Search" />
      </form>
    </>
  );
}
